import { AddonTypes, CommonAddon, TextTransformerInterface } from '../common-addon';

const emojiMap = {
  ":)": "🙂",
  ":D": "😀",
  ":(": "🙁",
  ":|": "😑",
  ":/": "😕",
  ":O": "😯",
};

export class EmojiText extends CommonAddon implements TextTransformerInterface {
  constructor() {
    super();
    this.type = AddonTypes.TextTransformer;
  }

  public transform(text: string): string {
    const regExKeys = Object.keys(emojiMap).map(key => (key.replace(/\)|\(|\||\//g, (match) => (`\\${match}`))));
    const regEx = new RegExp(regExKeys.join("|"), "gi");
    return (text.replace(regEx, (match) => (emojiMap[match])))
  };
};