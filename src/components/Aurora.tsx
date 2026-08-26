import { useEffect, useRef } from 'react';
import { Renderer, Program, Mesh, Color, Triangle } from 'ogl';

const VERT = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAG = `#version 300 es
precision highp float;

uniform float uTime;
uniform float uAmplitude;
uniform vec3 uColorStops[3];
uniform vec2 uResolution;
uniform float uBlend;

out vec4 fragColor;

vec3 permute(vec3 x) {
  return mod(((x * 34.0) + 1.0) * x, 289.0);
}

float snoise(vec2 v){
  const vec4 C = vec4(
      0.211324865405187, 0.366025403784439,
      -0.577350269189626, 0.024390243902439
  );
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);

  vec3 p = permute(
      permute(i.y + vec3(0.0, i1.y, 1.0))
    + i.x + vec3(0.0, i1.x, 1.0)
  );

  vec3 m = max(
      0.5 - vec3(
          dot(x0, x0),
          dot(x12.xy, x12.xy),
          dot(x12.zw, x12.zw)
      ),
      0.0
  );
  m = m * m;
  m = m * m;

  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);

  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

struct ColorStop {
  vec3 color;
  float position;
};

#define COLOR_RAMP(colors, factor, finalColor) {              \\
  int index = 0;                                              \\
  for (int i = 0; i < 2; i++) {                               \\
     ColorStop currentColor = colors[i];                      \\
     bool isInBetween = currentColor.position <= factor;      \\
     index = int(mix(float(index), float(i), float(isInBetween))); \\
  }                                                            \\
  ColorStop currentColor = colors[index];                     \\
  ColorStop nextColor = colors[index + 1];                    \\
  float range = nextColor.position - currentColor.position;   \\
  float lerpFactor = (factor - currentColor.position) / max(range, 0.0001); \\
  finalColor = mix(currentColor.color, nextColor.color, clamp(lerpFactor, 0.0, 1.0)); \\
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;

  ColorStop colors[3];
  colors[0] = ColorStop(uColorStops[0], 0.0);
  colors[1] = ColorStop(uColorStops[1], 0.5);
  colors[2] = ColorStop(uColorStops[2], 1.0);

  vec3 rampColor;
  COLOR_RAMP(colors, uv.x, rampColor);

  float height = snoise(vec2(uv.x * 2.0 + uTime * 0.1, uTime * 0.25)) * 0.5 * uAmplitude;
  height = exp(height);
  height = (uv.y * 2.0 - height + 0.2);
  float intensity = 0.6 * height;

  float midPoint = 0.20;
  float auroraAlpha = smoothstep(midPoint - uBlend * 0.5, midPoint + uBlend * 0.5, intensity);

  vec3 auroraColor = intensity * rampColor;

  fragColor = vec4(auroraColor * auroraAlpha, auroraAlpha);
}
`;

interface AuroraProps {
  colorStops?: string[];
  amplitude?: number;
  blend?: number;
  speed?: number;
}

export default function Aurora({
  colorStops = ['#00F0FF', '#8A2BE2', '#0047FF'],
  amplitude = 1.2,
  blend = 0.55,
  speed = 1.0,
}: AuroraProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const propsRef = useRef({ colorStops, amplitude, blend, speed });
  propsRef.current = { colorStops, amplitude, blend, speed };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let renderer: Renderer;
    try {
      renderer = new Renderer({ alpha: true, premultipliedAlpha: true, antialias: true });
    } catch {
      // WebGL unavailable in this environment — skip the shader background gracefully.
      return;
    }
    const gl = renderer.gl;
    if (!gl || !(renderer as any).isWebgl2) {
      // Shader requires GLSL ES 3.00 (WebGL2). Fall back to the static gradient
      // already applied to the container instead of risking a link failure.
      gl?.getExtension('WEBGL_lose_context')?.loseContext();
      return;
    }
    gl.clearColor(0, 0, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.canvas.style.backgroundColor = 'transparent';

    let program: Program | undefined;

    function resize() {
      if (!container) return;
      const width = container.offsetWidth;
      const height = container.offsetHeight;
      renderer.setSize(width, height);
      if (program) {
        program.uniforms.uResolution.value = [width, height];
      }
    }
    window.addEventListener('resize', resize);

    const geometry = new Triangle(gl);
    if ((geometry as any).attributes.uv) {
      delete (geometry as any).attributes.uv;
    }

    const normalizeStops = (stops: string[]) => {
      const padded = stops.slice(0, 3);
      while (padded.length < 3) padded.push(padded[padded.length - 1] ?? '#ffffff');
      return padded.map((hex) => {
        const c = new Color(hex);
        return [c.r, c.g, c.b];
      });
    };

    try {
      program = new Program(gl, {
        vertex: VERT,
        fragment: FRAG,
        uniforms: {
          uTime: { value: 0 },
          uAmplitude: { value: propsRef.current.amplitude },
          uColorStops: { value: normalizeStops(propsRef.current.colorStops) },
          uResolution: { value: [container.offsetWidth, container.offsetHeight] },
          uBlend: { value: propsRef.current.blend },
        },
      });
    } catch {
      // Shader link/compile failed on this GPU/driver — bail out to the static fallback.
      return;
    }

    const mesh = new Mesh(gl, { geometry, program });
    container.appendChild(gl.canvas);

    // Compute once — props are static in practice; allocating per frame churned GC.
    const cachedStops = normalizeStops(propsRef.current.colorStops);
    program.uniforms.uColorStops.value = cachedStops;
    let animateId = 0;
    let running = true;

    const update = (t: number) => {
      if (!running) return;
      animateId = requestAnimationFrame(update);
      if (!program) return;
      const speed = propsRef.current.speed ?? 1.0;
      program.uniforms.uTime.value = (t * 0.01) * speed * 0.1;
      renderer.render({ scene: mesh });
    };

    const start = () => {
      if (running && document.visibilityState === 'visible') {
        animateId = requestAnimationFrame(update);
      }
    };
    const stop = () => {
      cancelAnimationFrame(animateId);
    };
    const onVisibility = () => {
      stop();
      if (document.visibilityState === 'visible') start();
    };

    resize();
    start();
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      running = false;
      stop();
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('resize', resize);
      if (container.contains(gl.canvas)) {
        container.removeChild(gl.canvas);
      }
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full"
      style={{
        background:
          'radial-gradient(60% 50% at 50% 0%, rgba(0,240,255,0.15), transparent 70%)',
      }}
    />
  );
}
