// models/PokemonBuilder.ts
import type { Pokemon } from "./Pokemon";

export class PokemonBuilder {
  private _name: string = "";
  private _image: string = "";
  private _types: string[] = [];
  private _abilities: string[] = [];
  private _moves: string[] = [];

  setName(name: string) {
    this._name = name;
    return this;
  }

  setImage(image: string) {
    this._image = image;
    return this;
  }

  setTypes(types: string[]) {
    this._types = types;
    return this;
  }

  setAbilities(abilities: string[]) {
    this._abilities = abilities;
    return this;
  }

  setMoves(moves: string[]) {
    this._moves = moves;
    return this;
  }

  build(): Pokemon {
    return {
      name: this._name,
      image: this._image,
      types: this._types,
      abilities: this._abilities,
      moves: this._moves,
    };
  }
}