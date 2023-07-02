export class Company {
    id: string;
    name: string;
    domain: string;
    description: string;
  
    constructor(
      id: string,
      name: string,
      domain: string,
      description: string
    ) {
      this.id = id;
      this.name = name;
      this.domain = domain;
      this.description = description;
    }
  }
  