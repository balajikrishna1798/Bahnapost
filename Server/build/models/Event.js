"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const EventSchema = new mongoose_1.default.Schema({
    from: { type: Date },
    to: { type: Date },
    eventMsg: { type: String },
}, {
    //@ts-expect-error
    timeStamps: { type: Boolean, default: true }
});
exports.Event = mongoose_1.default.model("Event", EventSchema);
//# sourceMappingURL=Event.js.map