/// <reference types='npm:@webgpu/types' />
/// <reference types="npm:@types/w3c-image-capture" />
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) {
        resolve(value);
    } else {
        Promise.resolve(value).then(_next, _throw);
    }
}
function _async_to_generator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
function _ts_generator(thisArg, body) {
    var f, y, t, g, _ = {
        label: 0,
        sent: function() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    };
    return g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g;
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(_)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
}
var getCreateGpuBuffer = function(device, usage) {
    if (typeof usage === "string") {
        switch(usage){
            case "vertex":
                usage = GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST;
                break;
            case "index":
                usage = GPUBufferUsage.INDEX | GPUBufferUsage.COPY_DST;
                break;
            case "uniform":
                usage = GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST;
                break;
            case "storage":
                usage = GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST;
                break;
            case "indirect":
                usage = GPUBufferUsage.INDIRECT | GPUBufferUsage.COPY_DST;
                break;
            default:
                throw new Error("Invalid usage");
        }
    }
    return function(data) {
        if (typeof data === "number") data = new Float32Array(data);
        var buffer = device.createBuffer({
            size: data.byteLength,
            usage: usage,
            mappedAtCreation: true
        });
        var mappedBuffer = new Uint8Array(buffer.getMappedRange());
        if (ArrayBuffer.isView(data)) data = data.buffer;
        mappedBuffer.set(new Uint8Array(data));
        buffer.unmap();
        return buffer;
    };
};
var main = /*#__PURE__*/ function() {
    var _ref = _async_to_generator(function() {
        var code, gpu, adapter, device, canvas, context, format, alphaMode, stream, video, audio, audioContext, analyser, source, module, renderPipeline, createVertexBuffer, createIndexBuffer, createUniformBuffer, vertices, indices, vertexBuffer, indexBuffer, frequencyBuffer, timeBuffer, sampler, texture, renderBindGroup, render, update, animate, videoFrameCallback, resizeObserver;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    return [
                        4,
                        fetch("shaders/render.wgsl").then(function(res) {
                            return res.text();
                        })
                    ];
                case 1:
                    code = _state.sent();
                    gpu = navigator.gpu;
                    return [
                        4,
                        gpu.requestAdapter()
                    ];
                case 2:
                    adapter = _state.sent();
                    return [
                        4,
                        adapter === null || adapter === void 0 ? void 0 : adapter.requestDevice()
                    ];
                case 3:
                    device = _state.sent();
                    if (adapter == null || device == null) {
                        throw new Error("WebGPU not supported");
                    }
                    canvas = document.getElementById("canvas");
                    context = canvas.getContext("webgpu");
                    format = gpu.getPreferredCanvasFormat();
                    alphaMode = "premultiplied";
                    context.configure({
                        device: device,
                        format: format,
                        alphaMode: alphaMode
                    });
                    return [
                        4,
                        navigator.mediaDevices.getUserMedia({
                            video: true,
                            audio: true
                        })
                    ];
                case 4:
                    stream = _state.sent();
                    video = document.createElement("video");
                    video.srcObject = stream;
                    video.autoplay = true;
                    audio = document.createElement("audio");
                    audio.srcObject = stream;
                    audio.autoplay = true;
                    audioContext = new AudioContext();
                    analyser = audioContext.createAnalyser();
                    analyser.fftSize = 32;
                    source = audioContext.createMediaStreamSource(stream);
                    source.connect(analyser);
                    module = device.createShaderModule({
                        code: code
                    });
                    renderPipeline = device.createRenderPipeline({
                        vertex: {
                            module: module,
                            buffers: [
                                {
                                    arrayStride: 2 * 4,
                                    attributes: [
                                        {
                                            format: "float32x2",
                                            offset: 0,
                                            shaderLocation: 0
                                        }
                                    ]
                                }
                            ]
                        },
                        fragment: {
                            module: module,
                            targets: [
                                {
                                    format: format
                                }
                            ]
                        },
                        layout: "auto"
                    });
                    createVertexBuffer = getCreateGpuBuffer(device, "vertex");
                    createIndexBuffer = getCreateGpuBuffer(device, "index");
                    createUniformBuffer = getCreateGpuBuffer(device, "uniform");
                    // deno-fmt-ignore
                    vertices = new Float32Array([
                        -1.0,
                        -1.0,
                        1.0,
                        -1.0,
                        1.0,
                        1.0,
                        -1.0,
                        1.0
                    ]);
                    indices = new Uint32Array([
                        0,
                        1,
                        2,
                        0,
                        2,
                        3
                    ]);
                    vertexBuffer = createVertexBuffer(vertices);
                    indexBuffer = createIndexBuffer(indices);
                    frequencyBuffer = createUniformBuffer(analyser.frequencyBinCount);
                    timeBuffer = createUniformBuffer(1);
                    sampler = device.createSampler({
                        magFilter: "linear"
                    });
                    texture = undefined;
                    renderBindGroup = undefined;
                    render = function() {
                        try {
                            texture = device.importExternalTexture({
                                source: video
                            });
                            renderBindGroup = device.createBindGroup({
                                layout: renderPipeline.getBindGroupLayout(0),
                                entries: [
                                    {
                                        binding: 0,
                                        resource: sampler
                                    },
                                    {
                                        binding: 1,
                                        resource: texture
                                    },
                                    {
                                        binding: 2,
                                        resource: {
                                            buffer: timeBuffer
                                        }
                                    },
                                    {
                                        binding: 3,
                                        resource: {
                                            buffer: frequencyBuffer
                                        }
                                    }
                                ]
                            });
                        } catch (e) {
                            return;
                        }
                        var encoder = device.createCommandEncoder();
                        var canvasTexture = context.getCurrentTexture();
                        var colorAttachmentView = canvasTexture.createView();
                        var loadOp = "clear";
                        var storeOp = "store";
                        var renderPassDescriptor = {
                            colorAttachments: [
                                {
                                    view: colorAttachmentView,
                                    loadOp: loadOp,
                                    storeOp: storeOp
                                }
                            ]
                        };
                        var renderPass = encoder.beginRenderPass(renderPassDescriptor);
                        renderPass.setPipeline(renderPipeline);
                        renderPass.setBindGroup(0, renderBindGroup);
                        renderPass.setVertexBuffer(0, vertexBuffer);
                        renderPass.setIndexBuffer(indexBuffer, "uint32");
                        renderPass.drawIndexed(indices.length);
                        renderPass.end();
                        device.queue.submit([
                            encoder.finish()
                        ]);
                    };
                    update = function() {
                        var frequency = new Uint8Array(analyser.frequencyBinCount);
                        analyser.getByteFrequencyData(frequency);
                        device.queue.writeBuffer(frequencyBuffer, 0, frequency);
                        var time = new Float32Array([
                            performance.now() / 1000
                        ]);
                        device.queue.writeBuffer(timeBuffer, 0, time);
                    };
                    animate = function() {
                        requestAnimationFrame(animate);
                        update();
                        render();
                    };
                    requestAnimationFrame(animate);
                    videoFrameCallback = function(_now, metadata) {
                        video.requestVideoFrameCallback(videoFrameCallback);
                        var aspectRatio = metadata.width / metadata.height;
                        canvas.style.aspectRatio = aspectRatio.toString();
                        if (innerWidth / innerHeight > aspectRatio) {
                            canvas.style.height = "80%";
                            canvas.style.width = "auto";
                        } else {
                            canvas.style.height = "auto";
                            canvas.style.width = "80%";
                        }
                    };
                    video.requestVideoFrameCallback(videoFrameCallback);
                    resizeObserver = new ResizeObserver(function() {
                        canvas.width = canvas.clientWidth * devicePixelRatio;
                        canvas.height = canvas.clientHeight * devicePixelRatio;
                    });
                    resizeObserver.observe(canvas);
                    return [
                        2
                    ];
            }
        });
    });
    return function main() {
        return _ref.apply(this, arguments);
    };
}();
globalThis.onload = main;

