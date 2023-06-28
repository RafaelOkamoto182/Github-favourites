export class FavouritesData {
    constructor(root) {
        this.root = document.querySelector(root)
        this.loadGitHubData()
    }

    loadGitHubData() {

        this.githubUsers = [
            {
                login: "RafaelOkamoto182",
                name: "Rafael Okamoto",
                public_repos: "111",
                followers: "222"
            },
            {
                login: "diego3g",
                name: "Diego Fernandes",
                public_repos: "333",
                followers: "444"
            }
        ]
    }

    deleteGitHubUser(user) {
        //filter = false: remove o elemento. filter = true: mantem o elemento
        //quando uma arrow function só tem uma linha, ela retorna direto, sem precisar do return
        const filteredGitHubUsers = this.githubUsers
            .filter((gitHubUser) => gitHubUser.login !== user.login)

        //Principio da imutabilidade: nao estamos modificando o githubUsers inicial, estamos apagando todo ele e atribuindo um novo falor, q é o array filtrado  
        this.githubUsers = filteredGitHubUsers
        this.update()
    }

}

export class FavouritesView extends FavouritesData {
    constructor(root) {
        super(root)

        this.tableBody = this.root.querySelector('table tbody')

        this.update()
    }

    update() {
        this.removeAllTableRows()

        this.githubUsers.forEach((user) => {
            const tableRow = this.createTableRows()
            tableRow.querySelector('.user img').src = `https://github.com/${user.login}.png`
            tableRow.querySelector('.user img').alt = `${user.name}'s github profile pricture`
            tableRow.querySelector('.user a').href = `https://github.com/${user.login}`
            tableRow.querySelector('.user a p').textContent = user.name
            tableRow.querySelector('.user a span').textContent = user.login
            tableRow.querySelector('.repositories').textContent = user.public_repos
            tableRow.querySelector('.followers').textContent = user.followers

            tableRow.querySelector('.remove-button').onclick = () => {
                const isOk = confirm('Are you sure you want to remove this item?')
                if (isOk) {
                    this.deleteGitHubUser(user)
                }
            }

            this.tableBody.append(tableRow)
        })


    }

    removeAllTableRows() {
        //movido para a parte do construtor
        //const tableBody = this.root.querySelector('table tbody')

        //retorna um nodeList, que é tipo um array, com as linhas da tbody. O editor de texto n dá o autocomplete, mas dá pra textar no console do navegador.
        this.tableBody.querySelectorAll('tr')
            .forEach((tr) => {
                tr.remove()
            })
    }

    createTableRows() {

        const tr = document.createElement('tr')
        tr.innerHTML =
            `<td class="user">
            <img src="https://github.com/RafaelOkamoto182.png" alt="profile image of">
                <a href="https://github.com/RafaelOkamoto182" target="_blank">
                    <p>Rafael Okamoto</p>
                    <span>RafaelOkamoto182</span>
                </a>
            </td>
            <td class="repositories">111</td>
            <td class="followers">222</td>
            <td>
                <button class="remove-button">&times;</button>
            </td>`

        return tr
    }
}

/* 
Ao chamar o super() no construtor, é como se, naquele momento, ele chamassse o construtor da classe "pai", no caso a Favourites.
*/