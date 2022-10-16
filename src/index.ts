import fetch from "node-fetch";

export type Gender = "Male" | "Female";

export type ChatbotOptions = {
  name?: string;
  gender?: Gender;
  owner?: string;
};

export class Chatbot {
  public readonly data: ChatbotOptions = {};

  constructor(
    options: ChatbotOptions = {
      name: undefined,
      gender: undefined,
      owner: undefined,
    }
  ) {
    this.data = { ...options };
  }

  public setName(name: string): this {
    if (!name) throw new Error("No name provided.");
    this.data.name = name;
    return this;
  }

  public setOwner(owner: string): this {
    if (!owner) throw new Error("No owner provided.");
    this.data.owner = owner;
    return this;
  }

  public setGender(gender: Gender): this {
    if (!gender) throw new Error("No gender provided.");
    if (!["Male", "Female"].includes(gender))
      throw new Error('Gender must be "Male" or "Female".');

    this.data.gender = gender;
    return this;
  }

  public async chat(message: string): Promise<string> {
    if (!this.data.name)
      throw new Error("No name provided. Use Chatbot.setName() to set a name.");
    if (!this.data.gender)
      throw new Error(
        "No gender provided. Use Chatbot.setGender() to set a gender."
      );
    if (!this.data.owner)
      throw new Error(
        "No owner provided. Use Chatbot.setOwner() to set an owner."
      );
    if (!message) throw new Error("No message provided.");

    const { response } = (await fetch(
      `https://api.popcat.xyz/chatbot?msg=${encodeURIComponent(
        message
      )}}&owner=${encodeURIComponent(this.data.owner)}&botname=${
        this.data.name
      }`
    )
      .then((res) => res.json())
      .catch((err) => {
        throw new Error(err);
      })) as { response: string };

    return response.replace("female", this.data.gender.toLowerCase());
  }
}
