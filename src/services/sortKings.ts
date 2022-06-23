import romanToNumber from "./romanToNumber";

export default function sortKings(kings: string[]) {
  const kingsList: IKingNewObj[] = [];

  kings.forEach((k) => {
    const king: IKing = {
      Name: [],
      Number: 0,
    };

    king.Name = capitalize(k).split(" ");
    king.Number = romanToNumber(king.Name[1]);

    const newObj: IKingNewObj = {
      name: king.Name[0],
      fullname: king.Name.join(" "),
      number: king.Number,
    };

    kingsList.push(newObj);
  });

  kingsList.sort((a, b) => numberCompare(a, b));

  const namesList: string[] = [];

  kingsList.forEach((k) => {
    namesList.push(k.fullname);
  });

  return namesList;
}

interface IKing {
  Name: string[];
  Number: Number;
}

interface IKingNewObj {
  name: string;
  fullname: string;
  number: Number;
}

function numberCompare(a: any, b: any) {
  if (a.name > b.name) {
    return 1;
  }

  if (a.name < b.name) {
    return -1;
  }

  if (a.name === b.name) {
    if (Number(a.number) > Number(b.number)) {
      return 1;
    }
    if (Number(a.number) < Number(b.number)) {
      return -1;
    }
  }

  return 0;
}

function capitalize(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
