import React, { useState, useEffect } from "react";
import { FaPlus, FaCrown, FaMinus, FaSortAmountUp } from "react-icons/fa";
import { Container, Form, Button, List } from "./styles";
import SortKings from "../../services/sortKings";

export default function Main() {
  const [kings, setKing] = useState<string[]>([
    "Charles V",
    "Charles VII",
    "Jean II",
    "Charles VI",
    "Philippe VI",
    "Louis XI",
  ]);
  const [newKing, setNewKing] = useState<string>("");
  const [validate, setValid] = useState({ valid: true, msg: "" });

  const newKingValidation =
    /([A-z])\w (M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$)/gm;

  function handleAdd() {
    const king = newKing;
    // todo: better validation and multiple inputs
    // if (newKing.includes(",")) {
    //   const kingList = newKing.split(", ");
    //   kingList.forEach((king) => {
    //     setNewKingOnList(king);
    //   });
    //   return;
    // }
    setNewKingOnList(king);
  }

  function handleDelete(king: string) {
    setKing(kings.filter((k) => k !== king));
  }

  function sortKings() {
    setKing(SortKings(kings));
  }
  function setNewKingOnList(name: string) {
    const m = newKingValidation.exec(name);

    if (m !== null) {
      setKing([...kings, name]);
      setNewKing("");
      setValid({
        valid: true,
        msg: "",
      });
    } else {
      setValid({
        valid: false,
        msg: "Insira um nome de Rei Valido Ex: Jhon IV",
      });
    }
  }

  useEffect(() => {
    const storageKing = localStorage.getItem("kings");

    if (storageKing) {
      setKing(JSON.parse(storageKing));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("kings", JSON.stringify(kings));
  }, [kings]);

  return (
    <Container>
      <h1>
        <FaCrown /> Kings
      </h1>

      <Form>
        <input
          type="text"
          placeholder="Ex: King IV"
          value={newKing}
          onChange={(e) => setNewKing(e.target.value)}
        />

        <Button onClick={handleAdd}>
          <FaPlus />
        </Button>
      </Form>
      <p className="validate">{validate.msg}</p>

      <List>
        {kings.map((king, index) => (
          <li key={index}>
            <span>{king}</span>
            <Button className="delete" onClick={() => handleDelete(king)}>
              <FaMinus />
            </Button>
          </li>
        ))}
      </List>

      <footer>
        <Button className="order" onClick={sortKings}>
          Sort
          <FaSortAmountUp />
        </Button>
      </footer>
    </Container>
  );
}
