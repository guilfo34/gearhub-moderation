
	fetch('http://localhost:8000/api/find', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Origin': 'http://localhost:8000'
		},
		mode: 'cors'
	}).then(response => {
		return response.json()
	}).then(posts => {
			let table = document.getElementById('table')

		for (let i = 0; i < posts.length; i++) {
			let post = posts[i]
			let row = table.insertRow(i + 1)

			let cell1 = row.insertCell(0)
			cell1.innerHTML = post.id

			let cell2 = row.insertCell(1)
			cell2.innerHTML = post.date

			let cell3 = row.insertCell(2)
			cell3.innerHTML = post.user.email

			let cell4 = row.insertCell(3)
			cell4.innerHTML = post.text

			let cell5 = row.insertCell(4)
			cell5.innerHTML = "<a target='_blank' href='http://127.0.0.1:8000/uploads/" + post.image + "'><img class='image' src='http://127.0.0.1:8000/uploads/" + post.image + "'></a>"

			let validate = row.insertCell(5)
			validate.innerHTML = "<a class='validate' id='v" + post.id + "'>Validate <i class='fa-solid fa-check'></i></a>"
			

			document.getElementById("v" + post.id).addEventListener('click', () => {
				fetch('http://localhost:8000/api/validate?id=' + post.id, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						'Origin': 'http://localhost:8000'
					},
					mode: 'cors'
				}).then(() => {
					console.log('Moderation V OK');
					let rowIndex = Array.from(table.rows).findIndex(row => row.cells[0].innerHTML === post.id.toString());
					if (rowIndex !== -1) {
						table.deleteRow(rowIndex);
					}
				})
			})

			let refuse = row.insertCell(6)
			refuse.innerHTML = "<p class='refuse' id='r" + post.id + "'>Refuse <i class='fa-solid fa-xmark'></i></p> "
			document.getElementById("r" + post.id).addEventListener('click', () => {
				fetch('http://localhost:8000/api/refuse?id=' + post.id, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						'Origin': 'http://localhost:8000'
					},
					mode: 'cors'
				}).then(() => {
					console.log('Moderation R OK');
					let rowIndex = Array.from(table.rows).findIndex(row => row.cells[0].innerHTML === post.id.toString());
					if (rowIndex !== -1) {
						table.deleteRow(rowIndex);
					}
			})})
		}
	})
