"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chatbot = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
class Chatbot {
    constructor(options = {
        name: undefined,
        gender: undefined,
        owner: undefined,
    }) {
        this.data = {};
        this.data = Object.assign({}, options);
    }
    setName(name) {
        if (!name)
            throw new Error("No name provided.");
        this.data.name = name;
        return this;
    }
    setOwner(owner) {
        if (!owner)
            throw new Error("No owner provided.");
        this.data.owner = owner;
        return this;
    }
    setGender(gender) {
        if (!gender)
            throw new Error("No gender provided.");
        if (!["Male", "Female"].includes(gender))
            throw new Error('Gender must be "Male" or "Female".');
        this.data.gender = gender;
        return this;
    }
    chat(message) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.data.name)
                throw new Error("No name provided. Use Chatbot.setName() to set a name.");
            if (!this.data.gender)
                throw new Error("No gender provided. Use Chatbot.setGender() to set a gender.");
            if (!this.data.owner)
                throw new Error("No owner provided. Use Chatbot.setOwner() to set an owner.");
            if (!message)
                throw new Error("No message provided.");
            const { response } = (yield (0, node_fetch_1.default)(`https://api.popcat.xyz/chatbot?msg=${encodeURIComponent(message)}}&owner=${encodeURIComponent(this.data.owner)}&botname=${this.data.name}`)
                .then((res) => res.json())
                .catch((err) => {
                throw new Error(err);
            }));
            return response.replace("female", this.data.gender.toLowerCase());
        });
    }
}
exports.Chatbot = Chatbot;
