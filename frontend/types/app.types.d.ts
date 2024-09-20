export type Niveis = {
    id: number;
    nivel: string;
    devCount: number;
  };
  
  export type Devs = {
    id: number;
    nivel_id: number;
    nome: string;
    sexo: string;
    data_nascimento: Date;
    idade: number;
    hobby: string;
    nivel: Niveis;
  };
  