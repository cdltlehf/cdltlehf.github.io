/// <reference types="npm:@webgpu/types" />
/// <reference types="npm:@types/w3c-image-capture" />
function _array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_with_holes(arr) {
    if (Array.isArray(arr)) return arr;
}
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
function _instanceof(left, right) {
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return !!right[Symbol.hasInstance](left);
    } else {
        return left instanceof right;
    }
}
function _iterable_to_array_limit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
        for(_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true){
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
        }
    } catch (err) {
        _d = true;
        _e = err;
    } finally{
        try {
            if (!_n && _i["return"] != null) _i["return"]();
        } finally{
            if (_d) throw _e;
        }
    }
    return _arr;
}
function _non_iterable_rest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _sliced_to_array(arr, i) {
    return _array_with_holes(arr) || _iterable_to_array_limit(arr, i) || _unsupported_iterable_to_array(arr, i) || _non_iterable_rest();
}
function _unsupported_iterable_to_array(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array(o, minLen);
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
var map = function(f, xs) {
    return xs.map(f);
};
var enumerate = function(xs) {
    return xs.map(function(x, i) {
        return [
            i,
            x
        ];
    });
};
var init = function() {
    document.body.style.margin = "0";
    document.body.style.backgroundColor = "black";
    document.body.style.width = "100vw";
    document.body.style.height = "100vh";
};
var getUint8ArrayFromBitmap = function(bitmap, ctx) {
    var sWidth = bitmap.width;
    var sHeight = bitmap.height;
    var sRatio = sWidth / sHeight;
    var width = ctx.canvas.width;
    var height = ctx.canvas.height;
    var dRatio = width / height;
    var dx;
    var dy;
    var dWidth;
    var dHeight;
    if (sRatio > dRatio) {
        dx = 0;
        dWidth = width;
        dHeight = dWidth / sRatio;
        dy = (height - dHeight) / 2;
    } else {
        dy = 0;
        dHeight = height;
        dWidth = dHeight * sRatio;
        dx = (width - dWidth) / 2;
    }
    ctx.drawImage(bitmap, 0, 0, sWidth, sHeight, dx, dy, dWidth, dHeight);
    var imageData = ctx.getImageData(0, 0, width, height);
    var data = new Uint8ClampedArray(imageData.data.buffer);
    return data;
};
var getComputePipeline = /*#__PURE__*/ function() {
    var _ref = _async_to_generator(function(device, url, bindGroupInfo) {
        var code, module, visibility, entries, label, bindGroupLayout, bindGroupLayouts, layout, compute, computePipeline;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    return [
                        4,
                        fetch(url)
                    ];
                case 1:
                    return [
                        4,
                        _state.sent().text()
                    ];
                case 2:
                    code = _state.sent();
                    module = device.createShaderModule({
                        code: code
                    });
                    visibility = GPUShaderStage.COMPUTE;
                    entries = map(function(param) {
                        var _param = _sliced_to_array(param, 2), binding = _param[0], type = _param[1].type;
                        var buffer = {
                            type: type
                        };
                        return {
                            binding: binding,
                            visibility: visibility,
                            buffer: buffer
                        };
                    }, enumerate(bindGroupInfo));
                    label = "compute-bind-group-layout";
                    bindGroupLayout = device.createBindGroupLayout({
                        label: label,
                        entries: entries
                    });
                    bindGroupLayouts = [
                        bindGroupLayout
                    ];
                    layout = device.createPipelineLayout({
                        bindGroupLayouts: bindGroupLayouts
                    });
                    label = "compute-pipeline";
                    compute = {
                        module: module
                    };
                    computePipeline = device.createComputePipeline({
                        label: label,
                        layout: layout,
                        compute: compute
                    });
                    return [
                        2,
                        computePipeline
                    ];
            }
        });
    });
    return function getComputePipeline(device, url, bindGroupInfo) {
        return _ref.apply(this, arguments);
    };
}();
var getRenderPipeline = /*#__PURE__*/ function() {
    var _ref = _async_to_generator(function(device, vertexUrl, fragmentUrl, bindGroupInfo, format) {
        var vertexCode, fragmentCode, vertexModule, fragmentModule, visibility, entries, label, bindGroupLayout, bindGroupLayouts, layout, vertex, targets, fragment, renderPipeline;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    return [
                        4,
                        fetch(vertexUrl)
                    ];
                case 1:
                    return [
                        4,
                        _state.sent().text()
                    ];
                case 2:
                    vertexCode = _state.sent();
                    return [
                        4,
                        fetch(fragmentUrl)
                    ];
                case 3:
                    return [
                        4,
                        _state.sent().text()
                    ];
                case 4:
                    fragmentCode = _state.sent();
                    vertexModule = device.createShaderModule({
                        code: vertexCode
                    });
                    fragmentModule = device.createShaderModule({
                        code: fragmentCode
                    });
                    visibility = GPUShaderStage.VERTEX | GPUShaderStage.FRAGMENT;
                    entries = map(function(param) {
                        var _param = _sliced_to_array(param, 2), binding = _param[0], type = _param[1].type;
                        var buffer = {
                            type: type
                        };
                        return {
                            binding: binding,
                            visibility: visibility,
                            buffer: buffer
                        };
                    }, enumerate(bindGroupInfo));
                    label = "render-bind-group-layout";
                    bindGroupLayout = device.createBindGroupLayout({
                        label: label,
                        entries: entries
                    });
                    bindGroupLayouts = [
                        bindGroupLayout
                    ];
                    layout = device.createPipelineLayout({
                        bindGroupLayouts: bindGroupLayouts
                    });
                    vertex = {
                        module: vertexModule
                    };
                    targets = [
                        {
                            format: format
                        }
                    ];
                    fragment = {
                        module: fragmentModule,
                        targets: targets
                    };
                    label = "render-pipeline";
                    renderPipeline = device.createRenderPipeline({
                        label: label,
                        layout: layout,
                        vertex: vertex,
                        fragment: fragment
                    });
                    return [
                        2,
                        renderPipeline
                    ];
            }
        });
    });
    return function getRenderPipeline(device, vertexUrl, fragmentUrl, bindGroupInfo, format) {
        return _ref.apply(this, arguments);
    };
}();
var getResizeObserver = function(device, callback) {
    var resizeObserver = new ResizeObserver(function(entries) {
        var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
        try {
            for(var _iterator = entries[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                var entry = _step.value;
                if (!_instanceof(entry.target, HTMLCanvasElement)) continue;
                var canvas = entry.target;
                var width = canvas.clientWidth;
                var height = canvas.clientHeight;
                var maxTextureDimension = device.limits.maxTextureDimension2D;
                canvas.width = Math.max(1, Math.min(width, maxTextureDimension));
                canvas.height = Math.max(1, Math.min(height, maxTextureDimension));
                callback(canvas.width, canvas.height);
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally{
            try {
                if (!_iteratorNormalCompletion && _iterator.return != null) {
                    _iterator.return();
                }
            } finally{
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
    });
    return resizeObserver;
};
var main = /*#__PURE__*/ function() {
    var _ref = _async_to_generator(function() {
        var _navigator_gpu, canvas, gpu, stream, videoTrack, imageCapture, offscreenCanvas, offscreenContext, adapter, device, context, format, computUrl, vertexUrl, fragmentUrl, gridWidth, gridHeight, gridSize, bufferInfos, computeBindGroupInfo, computePipeline, renderBindGroupInfo, renderPipeline, buffers, gridResolutionBuffer, gridResolutionArray, gridBuffer, previousGridBuffer, frameBuffer, previousFrameBuffer, getComputeBindGroup, getRenderBindGroup, resize, resizeObserver, prevTimestamp, frame, animationFrame;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    init();
                    canvas = document.createElement("canvas");
                    canvas.style.width = "100%";
                    canvas.style.maxHeight = "100%";
                    canvas.style.imageRendering = "pixelated";
                    document.body.appendChild(canvas);
                    gpu = navigator.gpu;
                    return [
                        4,
                        navigator.mediaDevices.getUserMedia({
                            video: true
                        })
                    ];
                case 1:
                    stream = _state.sent();
                    videoTrack = stream.getVideoTracks()[0];
                    imageCapture = new ImageCapture(videoTrack);
                    offscreenCanvas = new OffscreenCanvas(0, 0);
                    offscreenContext = offscreenCanvas.getContext("2d", {
                        willReadFrequently: true
                    });
                    return [
                        4,
                        gpu.requestAdapter().catch(function(_) {
                            return null;
                        })
                    ];
                case 2:
                    adapter = _state.sent();
                    return [
                        4,
                        adapter.requestDevice().catch(function(_) {
                            return null;
                        })
                    ];
                case 3:
                    device = _state.sent();
                    context = canvas.getContext("webgpu");
                    if (device == null || context == null) {
                        alert("WebGPU is not supported in your browser");
                        return [
                            2
                        ];
                    }
                    format = (_navigator_gpu = navigator.gpu) === null || _navigator_gpu === void 0 ? void 0 : _navigator_gpu.getPreferredCanvasFormat();
                    context.configure({
                        device: device,
                        format: format
                    });
                    computUrl = "./compute.wgsl";
                    vertexUrl = "./vertex.wgsl";
                    fragmentUrl = "./fragment.wgsl";
                    gridWidth = 512;
                    gridHeight = 512;
                    // const gridWidth = 64;
                    // const gridHeight = 64;
                    gridSize = gridWidth * gridHeight * 4;
                    bufferInfos = [
                        {
                            label: "resolution",
                            size: 8,
                            usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
                            type: {
                                compute: "uniform",
                                render: "uniform"
                            }
                        },
                        {
                            label: "grid-resolution",
                            size: 8,
                            usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
                            type: {
                                compute: "uniform",
                                render: "uniform"
                            }
                        },
                        {
                            label: "time",
                            size: 4,
                            usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
                            type: {
                                compute: "uniform",
                                render: "uniform"
                            }
                        },
                        {
                            label: "mouse",
                            size: 4 * 3,
                            usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
                            type: {
                                compute: "uniform",
                                render: "uniform"
                            }
                        },
                        {
                            label: "frame",
                            size: 0,
                            usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC | GPUBufferUsage.COPY_DST,
                            type: {
                                compute: "read-only-storage",
                                render: "read-only-storage"
                            }
                        },
                        {
                            label: "grid",
                            size: gridSize,
                            usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC | GPUBufferUsage.COPY_DST,
                            type: {
                                compute: "storage",
                                render: "read-only-storage"
                            }
                        },
                        {
                            label: "velocity",
                            size: gridSize,
                            usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC | GPUBufferUsage.COPY_DST,
                            type: {
                                compute: "storage",
                                render: "read-only-storage"
                            }
                        },
                        {
                            label: "previous-frame",
                            size: 0,
                            usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC | GPUBufferUsage.COPY_DST,
                            type: {
                                compute: "read-only-storage",
                                render: "read-only-storage"
                            }
                        },
                        {
                            label: "previous-grid",
                            size: gridSize,
                            usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC | GPUBufferUsage.COPY_DST,
                            type: {
                                compute: "read-only-storage",
                                render: "read-only-storage"
                            }
                        }
                    ];
                    computeBindGroupInfo = map(function(param) {
                        var label = param.label, type = param.type;
                        return {
                            label: label,
                            type: type.compute
                        };
                    }, bufferInfos);
                    return [
                        4,
                        getComputePipeline(device, computUrl, computeBindGroupInfo)
                    ];
                case 4:
                    computePipeline = _state.sent();
                    renderBindGroupInfo = map(function(param) {
                        var label = param.label, type = param.type;
                        return {
                            label: label,
                            type: type.render
                        };
                    }, bufferInfos);
                    return [
                        4,
                        getRenderPipeline(device, vertexUrl, fragmentUrl, renderBindGroupInfo, format)
                    ];
                case 5:
                    renderPipeline = _state.sent();
                    buffers = new Map(map(function(param) {
                        var label = param.label, size = param.size, usage = param.usage;
                        return [
                            label,
                            device.createBuffer({
                                label: label,
                                size: size,
                                usage: usage
                            })
                        ];
                    }, bufferInfos));
                    gridResolutionBuffer = buffers.get("grid-resolution");
                    gridResolutionArray = new Uint32Array([
                        gridWidth,
                        gridHeight
                    ]);
                    device.queue.writeBuffer(gridResolutionBuffer, 0, gridResolutionArray);
                    getComputeBindGroup = function(frame) {
                        if (frame % 2 == 0) {
                            gridBuffer = buffers.get("grid");
                            previousGridBuffer = buffers.get("previous-grid");
                            frameBuffer = buffers.get("frame");
                            previousFrameBuffer = buffers.get("previous-frame");
                        } else {
                            gridBuffer = buffers.get("previous-grid");
                            previousGridBuffer = buffers.get("grid");
                            frameBuffer = buffers.get("previous-frame");
                            previousFrameBuffer = buffers.get("frame");
                        }
                        var bufferList = [
                            buffers.get("resolution"),
                            buffers.get("grid-resolution"),
                            buffers.get("time"),
                            buffers.get("mouse"),
                            frameBuffer,
                            gridBuffer,
                            buffers.get("velocity"),
                            previousFrameBuffer,
                            previousGridBuffer
                        ];
                        var entries = map(function(param) {
                            var _param = _sliced_to_array(param, 2), binding = _param[0], buffer = _param[1];
                            return {
                                binding: binding,
                                resource: {
                                    buffer: buffer
                                }
                            };
                        }, enumerate(bufferList));
                        var layout = computePipeline.getBindGroupLayout(0);
                        var bindGroup = device.createBindGroup({
                            layout: layout,
                            entries: entries
                        });
                        return bindGroup;
                    };
                    getRenderBindGroup = function(frame) {
                        var gridBuffer;
                        var previousGridBuffer;
                        var frameBuffer;
                        var previousFrameBuffer;
                        if (frame % 2 == 0) {
                            gridBuffer = buffers.get("grid");
                            previousGridBuffer = buffers.get("previous-grid");
                            frameBuffer = buffers.get("frame");
                            previousFrameBuffer = buffers.get("previous-frame");
                        } else {
                            gridBuffer = buffers.get("previous-grid");
                            previousGridBuffer = buffers.get("grid");
                            frameBuffer = buffers.get("previous-frame");
                            previousFrameBuffer = buffers.get("frame");
                        }
                        var bufferList = [
                            buffers.get("resolution"),
                            buffers.get("grid-resolution"),
                            buffers.get("time"),
                            buffers.get("mouse"),
                            frameBuffer,
                            gridBuffer,
                            buffers.get("velocity"),
                            previousFrameBuffer,
                            previousGridBuffer
                        ];
                        var entries = map(function(param) {
                            var _param = _sliced_to_array(param, 2), binding = _param[0], buffer = _param[1];
                            return {
                                binding: binding,
                                resource: {
                                    buffer: buffer
                                }
                            };
                        }, enumerate(bufferList));
                        var layout = renderPipeline.getBindGroupLayout(0);
                        var bindGroup = device.createBindGroup({
                            layout: layout,
                            entries: entries
                        });
                        return bindGroup;
                    };
                    resize = function(width, height) {
                        offscreenCanvas.width = width;
                        offscreenCanvas.height = height;
                        var encoder = device.createCommandEncoder();
                        var resolutionBuffer = buffers.get("resolution");
                        var resolutionBufferView = new Uint32Array([
                            width,
                            height
                        ]);
                        device.queue.writeBuffer(resolutionBuffer, 0, resolutionBufferView);
                        for(var _i = 0, _iter = [
                            "frame",
                            "previous-frame"
                        ]; _i < _iter.length; _i++){
                            var label = _iter[_i];
                            var size = width * height * 4;
                            var usage = GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC | GPUBufferUsage.COPY_DST;
                            var buffer = device.createBuffer({
                                label: label,
                                size: size,
                                usage: usage
                            });
                            device.queue.writeBuffer(buffer, 0, new ArrayBuffer(size));
                            buffers.set(label, buffer);
                        }
                        for(var _i1 = 0, _iter1 = [
                            "grid",
                            "velocity",
                            "previous-grid"
                        ]; _i1 < _iter1.length; _i1++){
                            var label1 = _iter1[_i1];
                            var buffer1 = buffers.get(label1);
                            var size1 = gridSize;
                            device.queue.writeBuffer(buffer1, 0, new ArrayBuffer(size1));
                        }
                        var commandBuffer = encoder.finish();
                        device.queue.submit([
                            commandBuffer
                        ]);
                    };
                    resizeObserver = getResizeObserver(device, resize);
                    resizeObserver.observe(canvas);
                    canvas.onmousemove = function(e) {
                        if (!_instanceof(e.target, HTMLElement)) return;
                        var rect = e.target.getBoundingClientRect();
                        var mouseX = e.clientX - rect.left;
                        var mouseY = e.clientY - rect.top;
                        var mouse = new Uint32Array([
                            mouseX,
                            mouseY
                        ]);
                        var mouseBuffer = buffers.get("mouse");
                        device.queue.writeBuffer(mouseBuffer, 0, mouse);
                    };
                    canvas.onmousedown = function(_) {
                        var clicked = new Uint32Array([
                            1
                        ]);
                        var mouseBuffer = buffers.get("mouse");
                        device.queue.writeBuffer(mouseBuffer, 8, clicked);
                    };
                    canvas.onmouseup = function(_) {
                        var clicked = new Uint32Array([
                            0
                        ]);
                        var mouseBuffer = buffers.get("mouse");
                        device.queue.writeBuffer(mouseBuffer, 8, clicked);
                    };
                    prevTimestamp = 0;
                    frame = 0;
                    animationFrame = /*#__PURE__*/ function() {
                        var _ref = _async_to_generator(function(timestamp) {
                            var bitmap, image, resolution, time, resolutionBuffer, timeBuffer, imageBuffer, encoder, texture, view, loadOp, storeOp, colorAttachment, colorAttachments, descriptor, computeBindGroup, computePass, renderBindGroup, renderPass, commandBuffer;
                            return _ts_generator(this, function(_state) {
                                switch(_state.label){
                                    case 0:
                                        return [
                                            4,
                                            imageCapture.grabFrame()
                                        ];
                                    case 1:
                                        bitmap = _state.sent();
                                        canvas.style.aspectRatio = "".concat(bitmap.width, " / ").concat(bitmap.height);
                                        image = getUint8ArrayFromBitmap(bitmap, offscreenContext);
                                        resolution = new Uint32Array([
                                            canvas.width,
                                            canvas.height
                                        ]);
                                        time = new Float32Array([
                                            (timestamp - prevTimestamp) / 1000
                                        ]);
                                        resolutionBuffer = buffers.get("resolution");
                                        timeBuffer = buffers.get("time");
                                        device.queue.writeBuffer(resolutionBuffer, 0, resolution);
                                        device.queue.writeBuffer(timeBuffer, 0, time);
                                        imageBuffer = buffers.get(frame % 2 == 0 ? "frame" : "previous-frame");
                                        device.queue.writeBuffer(imageBuffer, 0, image);
                                        encoder = device.createCommandEncoder();
                                        texture = context.getCurrentTexture();
                                        view = texture.createView();
                                        loadOp = "clear";
                                        storeOp = "store";
                                        colorAttachment = {
                                            view: view,
                                            loadOp: loadOp,
                                            storeOp: storeOp
                                        };
                                        colorAttachments = [
                                            colorAttachment
                                        ];
                                        descriptor = {
                                            colorAttachments: colorAttachments
                                        };
                                        computeBindGroup = getComputeBindGroup(frame);
                                        computePass = encoder.beginComputePass();
                                        computePass.setPipeline(computePipeline);
                                        computePass.setBindGroup(0, computeBindGroup);
                                        computePass.dispatchWorkgroups(gridWidth, gridHeight);
                                        computePass.end();
                                        renderBindGroup = getRenderBindGroup(frame);
                                        renderPass = encoder.beginRenderPass(descriptor);
                                        renderPass.setPipeline(renderPipeline);
                                        renderPass.setBindGroup(0, renderBindGroup);
                                        renderPass.draw(6);
                                        renderPass.end();
                                        commandBuffer = encoder.finish();
                                        device.queue.submit([
                                            commandBuffer
                                        ]);
                                        prevTimestamp = timestamp;
                                        frame++;
                                        requestAnimationFrame(animationFrame);
                                        return [
                                            2
                                        ];
                                }
                            });
                        });
                        return function animationFrame(timestamp) {
                            return _ref.apply(this, arguments);
                        };
                    }();
                    animationFrame(prevTimestamp);
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

