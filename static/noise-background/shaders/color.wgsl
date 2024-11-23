fn mod2(x: f32, y: f32) -> f32 {
    return x - y * floor(x / y);
}

fn rgbToHsl(rgb: vec3f) -> vec3f {
    let cmax = max(rgb.r, max(rgb.g, rgb.b));
    let cmin = min(rgb.r, min(rgb.g, rgb.b));
    let delta = cmax - cmin;
    var h: f32;
    if (delta == 0.0) {
        h = 0.0;
    } else if (cmax == rgb.r) {
        h = mod2((rgb.g - rgb.b) / delta, 6.0);
    } else if (cmax == rgb.g) {
        h = (rgb.b - rgb.r) / delta + 2.0;
    } else {
        h = (rgb.r - rgb.g) / delta + 4.0;
    }
    h *= 60.0;
    let l = (cmax + cmin) * 0.5;
    var s = select(delta / (1.0 - abs(2.0 * l - 1.0)), 0.0, delta == 0.0);
    return vec3f(h, s, l);
}

fn rgbToHsv(rgb: vec3f) -> vec3f {
    let cmax = max(rgb.r, max(rgb.g, rgb.b));
    let cmin = min(rgb.r, min(rgb.g, rgb.b));
    let delta = cmax - cmin;
    var h: f32;
    if (delta == 0.0) {
        h = 0.0;
    } else if (cmax == rgb.r) {
        h = mod2((rgb.g - rgb.b) / delta, 6.0);
    } else if (cmax == rgb.g) {
        h = (rgb.b - rgb.r) / delta + 2.0;
    } else {
        h = (rgb.r - rgb.g) / delta + 4.0;
    }
    h *= 60.0;
    let s = select(0.0, delta / cmax, cmax != 0.0);
    let v = cmax;
    return vec3f(h, s, v);
}

fn hslToRgb(hsl: vec3f) -> vec3f {
    let c = (1.0 - abs(2.0 * hsl.z - 1.0)) * hsl.y;
    let x = c * (1.0 - abs(mod2(hsl.x / 60.0, 2.0) - 1.0));
    let m = hsl.z - c * 0.5;
    var rgb: vec3f;
    if (hsl.x < 60.0) {
        rgb = vec3f(c, x, 0.0);
    } else if (hsl.x < 120.0) {
        rgb = vec3f(x, c, 0.0);
    } else if (hsl.x < 180.0) {
        rgb = vec3f(0.0, c, x);
    } else if (hsl.x < 240.0) {
        rgb = vec3f(0.0, x, c);
    } else if (hsl.x < 300.0) {
        rgb = vec3f(x, 0.0, c);
    } else {
        rgb = vec3f(c, 0.0, x);
    }
    return rgb + m;
}

fn hsvToRgb(hsv: vec3f) -> vec3f {
    let c = hsv.y * hsv.z;
    let x = c * (1.0 - abs(mod2(hsv.x / 60.0, 2.0) - 1.0));
    let m = hsv.z - c;
    var rgb: vec3f;
    if (hsv.x < 60.0) {
        rgb = vec3f(c, x, 0.0);
    } else if (hsv.x < 120.0) {
        rgb = vec3f(x, c, 0.0);
    } else if (hsv.x < 180.0) {
        rgb = vec3f(0.0, c, x);
    } else if (hsv.x < 240.0) {
        rgb = vec3f(0.0, x, c);
    } else if (hsv.x < 300.0) {
        rgb = vec3f(x, 0.0, c);
    } else {
        rgb = vec3f(c, 0.0, x);
    }
    return rgb + m;
}
