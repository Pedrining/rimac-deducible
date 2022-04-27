module.exports = {
	obtenerDeducible: function(payload, parametro, callback) {
		//Agregar detalle
		let respuesta = [];
		let obj = {}, copago, moneda, lines
		switch (parametro.deducible) {
			case 'D22':
				let D22 = payload[0].text
				obj.deducible = D22.substring(D22.indexOf("Por evento") + ("Por evento").length + 1, D22.indexOf("%"))
				copago = D22.substring(D22.indexOf("mínimo") + ("mínimo").length + 1, D22.indexOf("Excepto"))
				moneda = D22.substring(D22.indexOf(copago), D22.indexOf(copago) + 2) == "US" ? "USD" : D22.substring(D22.indexOf(copago), D22.indexOf(copago) + 2) == "S/" ? "PEN" : "PEN"
				obj.copago = copago.match(/\d+((\.|,)\d+)?/)[0]
				obj.moneda = moneda
				obj.tipo = "NO TIPO"
				obj.marca = "NO MARCA"
				obj.taller = "NO TALLER"
				respuesta.push(obj)
				break;
			case 'D85':
				let D85 = payload[1].text
				obj.deducible = D85.substring(D85.indexOf("VEHA") + 7, D85.indexOf("%"))
				copago = D85.substring(D85.indexOf("mínimo") + ("mínimo").length + 1, D85.indexOf("pérdida"))
				moneda = D85.substring(D85.indexOf(copago), D85.indexOf(copago) + 2) == "US" ? "USD" : D85.substring(D85.indexOf(copago), D85.indexOf(copago) + 2) == "S/" ? "PEN" : "PEN"
				obj.copago = copago.match(/\d+((\.|,)\d+)?/)[0]
				obj.moneda = moneda
				obj.tipo = "NO TIPO"
				obj.marca = "NO MARCA"
				obj.taller = "NO TALLER"
				respuesta.push(obj)
				break;
			case 'D10':
				let D10 = payload[2].text
				lines = D10.split("Por Evento")
				for (var line = 0; line < lines.length; line++) {
					if (lines[line].indexOf("%") != -1) {
						let deducible = lines[line].substring(0, lines[line].indexOf("%")).replace(/ /g, '')
						copago = lines[line].substring(lines[line].indexOf("mínimo") + ("mínimo").length + 1, lines[line].indexOf("Talleres"))
						moneda = lines[line].substring(lines[line].indexOf(copago), lines[line].indexOf(copago) + 2) == "US" ? "USD" : lines[line].substring(lines[line].indexOf(copago), lines[line].indexOf(copago) + 2) == "S/" ? "PEN" : "PEN"
						let tipo = lines[line].includes("Multimarca") ? "Multimarca" : "NO TIPO"
						obj.deducible = deducible
						obj.copago = copago.match(/\d+((\.|,)\d+)?/)[0]
						obj.moneda = moneda
						obj.tipo = tipo
						obj.marca = "NO MARCA"
						obj.taller = "NO TALLER"
						respuesta.push(obj)
					}

				}
				break;
			case 'D86':
				let D86 = payload[3].text
				lines = D86.split("Ausencia")
				for (var line = 0; lines.length; line++) {
					if (lines[line].indexOf("%") != -1) {
						let deducible = lines[line].substring(0, lines[line].indexOf("%")).match(/\d+((\.|,)\d+)?/)[0]
						copago = lines[line].substring(lines[line].indexOf("mínimo") + ("mínimo").length + 1, lines[line].indexOf("Talleres"))
						moneda = lines[line].substring(lines[line].indexOf(copago), lines[line].indexOf(copago) + 2) == "US" ? "USD" : lines[line].substring(lines[line].indexOf(copago), lines[line].indexOf(copago) + 2) == "S/" ? "PEN" : "PEN"
						let tipo = lines[line].includes("Multimarca") ? "Multimarca" : "NO TIPO"
						obj.deducible = deducible
						obj.copago = copago.match(/\d+((\.|,)\d+)?/)[0]
						obj.moneda = moneda
						obj.tipo = tipo
						obj.marca = "NO MARCA"
						obj.taller = "NO TALLER"
						respuesta.push(obj)
					}

				}
				break;
			case 'D314':
				let D314 = payload[5].text
				lines = D314.split(/\r\n|\r|\n/, -1)
				for (var line = 0; line < lines.length; line++) {
					if (lines[line].indexOf("%") != -1) {
						let deducible = lines[line].substring(0, lines[line].indexOf("%")).match(/\d+((\.|,)\d+)?/)[0]
						copago = lines[line].substring(lines[line].indexOf("mínimo") + ("mínimo").length + 1, lines[line].indexOf("en"))
						moneda = copago.includes("US$") ? "USD" : copago.includes("S/") ? "PEN" : "PEN"
						let tipo = lines[line].includes("Multimarca") ? "Multimarca" : "NO TIPO"
						let taller = lines[line].substring(lines[line].indexOf("Talleres") + ("Talleres").length + 1)
						obj.deducible = deducible
						obj.copago = copago.match(/\d+((\.|,)\d+)?/)[0]
						obj.moneda = moneda
						obj.tipo = tipo
						obj.marca = "NO MARCA"
						obj.taller = taller.length > 1 ? taller : "NO TALLER"
						respuesta.push(obj)
					}

				}
				break;
			case 'D1256':
				let D1256 = payload[6].text
				let deducible = D1256.split(/([0-9\.]+).+/)[1]
				copago = D1256.substring(D1256.indexOf("Mínimo") + ("Mínimo").length + 1)
				moneda = copago.includes("US$") ? "USD" : copago.includes("S/") ? "PEN" : "PEN"
				let tipo = D1256.includes("Multimarca") ? "Multimarca" : "NO TIPO"
				let taller = D1256.substring(D1256.indexOf("TALLERES") + ("TALLERES").length + 1, D1256.indexOf(","))
				obj.deducible = deducible
				obj.copago = copago.match(/\d+((\.|,)\d+)?/)[0]
				obj.moneda = moneda
				obj.tipo = tipo
				obj.marca = "NO MARCA"
				obj.taller = taller.length > 1 ? taller : "NO TALLER"
				respuesta.push(obj)
				break;

			default:
				// CASO D6007, CASO D5936 Y CASO D4514 MISMA LOGICA
				let D6007 = payload[7].text
				lines = D6007.split("Por evento")
				for (var line = 0; line < lines.length; line++) {
					if (lines[line].indexOf("%") != -1) {
						let deducible = lines[line].substring(0, lines[line].indexOf("%")).match(/\d+((\.|,)\d+)?/)[0]
						let copago = lines[line].substring(lines[line].indexOf("mínimo") + ("mínimo").length + 1)
						let moneda = copago.includes("US$") ? "USD" : copago.includes("S/") ? "PEN" : "PEN"
						let tipo = lines[line].includes("multimarca") ? "Multimarca" : "NO TIPO"
						let marca = lines[line].includes("Marca") ? lines[line].substring(lines[line].indexOf("Marca"), lines[line].indexOf(":")) : "NO MARCA"
						obj.deducible = deducible
						obj.copago = copago.match(/\d+((\.|,)\d+)?/)[0]
						obj.moneda = moneda
						obj.tipo = tipo
						obj.marca = marca
						obj.taller = "NO TALLER"
						respuesta.push(obj)
					}

				}
		}

		console.log("respuesta : " + JSON.stringify(respuesta))
		return callback(null, respuesta);
	}

};
