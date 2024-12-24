interface User {  
    name: string;  
    age: number;  
}  

let user: User = {  
    name: "Alice",  
    age: 25  
};

function greet(name: string): string {  
    return `Hello, ${name}!`;  
}