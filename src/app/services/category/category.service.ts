import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor() { }

  getCategories() {
    return [
      {
        id: '1',
        name: "JavaScript",
        create_at: "2025-03-02T10:00:00Z"
      },
      {
        id: '2',
        name: "TypeScript",
        create_at: "2025-03-02T10:05:00Z"
      },
      {
        id: '3',
        name: "Angular",
        create_at: "2025-03-02T10:10:00Z"
      },
      {
        id: '4',
        name: "React",
        create_at: "2025-03-02T10:15:00Z"
      },
      {
        id: '5',
        name: "Node.js",
        create_at: "2025-03-02T10:20:00Z"
      },
    ];
  }
}
