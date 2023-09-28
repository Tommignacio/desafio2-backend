const fs = require("fs");

class Container {
	constructor(name) {
		this.name = name;
		this.path = "./files";
	}

	async createFiles() {
		try {
			if (fs.existsSync(this.path)) {
				return false;
			} else {
				await fs.promises.mkdir(this.path);
				return true;
			}
		} catch (error) {
			console.log(error);
		}
	}

	async createFile() {
		try {
			if (fs.existsSync(`${this.path}/${this.name}.txt`)) {
				console.log("arch existe");
				return false;
			} else {
				await this.write("");
				console.log("arch no existe");
				return true;
			}
		} catch (error) {
			console.log(error);
		}
	}

	async write(content) {
		try {
			console.log(content, "contenido");
			await fs.promises.writeFile(`${this.path}/${this.name}.txt`, content);
		} catch (error) {
			console.log(error);
		}
	}

	async read() {
		try {
			let file = await fs.promises.readFile(
				`${this.path}/${this.name}.txt`,
				"utf-8"
			);
			if (file == "") {
				file = [];
				return file;
			} else {
				file = JSON.parse(file);
				return file;
			}
		} catch (error) {
			console.log(error);
		}
	}
	async save(obj) {
		try {
			await this.createFile();
			let fileContent = await this.read();
			obj.id = fileContent.length + 1;
			fileContent.push(obj);
			await this.write(JSON.stringify(fileContent));
			return obj.id;
		} catch (error) {
			console.log(error);
		}
	}

	async getById(number) {
		try {
			let fileContent = await this.read();
			console.log(fileContent, "fileContent");
			for (let i of fileContent) {
				if (i.id === number) {
					return i;
				}
			}
			console.log("producto no encontrado");
			return null;
		} catch (error) {
			console.log(error);
		}
	}

	async getAll() {
		try {
			let fileContent = await this.read();
			console.log(fileContent);
			return fileContent;
		} catch (error) {
			console.log(error);
		}
	}

	async deleteById(number) {
		try {
			let fileContent = await this.read();
			let nContent = fileContent.filter((e) => e.id != number);
			await this.write(JSON.stringify(nContent));
			console.log(nContent);
		} catch (error) {
			console.log(error);
		}
	}
	async deleteAll() {
		try {
			let fileContent = await this.read();
			fileContent = "";
			await this.write(fileContent);
		} catch (error) {
			console.log(error);
		}
	}

	async updateProduct(id, obj) {
		try {
			let indice = 0;
			let exist = false;
			let fileContent = await this.read(); // metodo que lee el archivo con readFIle
			//recorre el array de objetos
			for (let i of fileContent) {
				if (i.id === id) {
					obj.id = id; //mantiene el id
					fileContent[indice] = obj; //agrega el producto nuevo
					exist = true;
				}
				indice++;
			}
			//si existe el id
			if (exist) {
				await this.write(JSON.stringify(fileContent)); //actualiza el producto
			} else {
				console.log("no existe ese id");
			}
		} catch (error) {
			console.log(error);
		}
	}
}

module.exports = Container;
const contenedor = new Container("file2");
//contenedor.createFiles();
contenedor.save({ title: "ernesto", price: "1.2", thumbnail: "www.dmcka.com" });
// contenedor.updateProduct(2, {
// 	title: "RICHARD",
// 	price: "1.2",
// 	thumbnail: "www.dmcka.com",
// });
// contenedor.getById(22);
// contenedor.getAll();
// contenedor.deleteById(1);
