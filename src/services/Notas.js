import tarefas from '../database'

export function criarTabela(){
    tarefas.transaction((tx) => {
        tx.executeSql(
            `
                CREATE TABLE IF NOT EXISTS Notas (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    titulo TEXT,
                    categoria TEXT,
                    texto TEXT
                );
            `,
            [],
            (_, error) => {
                console.log(error)
            }
        )
    })
}

export async function adicionarNota(nota){
    return new Promise((resolve, reject) => {
        tarefas.transaction((tx) => {
            tx.executeSql(
                `
                    INSERT INTO Notas (titulo, categoria, texto) VALUES (?, ?, ?);
                `,
                [
                nota.titulo,
                nota.categoria,
                nota.texto
                ],
                (_, {rowsAffected, insertId}) => {
                    if(rowsAffected > 0) resolve(insertId)
                    else reject ("Erro ao adicionar uma nota: " + JSON.stringify(nota))
                },
                (_, error) => reject(error)
            )
        })
    })
}

export async function buscarNotas(categoria = "*"){
    return new Promise((resolve, reject) => {
        tarefas.transaction((tx) => {
            let comando
            if(categoria = "*"){
                comando = "SELECT * FROM Notas;"
            }else{
                comando = `SELECT * FROM Notas WHERE categoria = "${categoria}";`
            }

            tx.executeSql(comando, [],
                (transaction, resultado) => {
                    resolve(resultado.rows._array)
                },
                (_, error) => reject(error)
            )
        })
    })
}

export async function atualizarNota(){
    return new Promise((resolve, reject) => {
        tarefas.transaction((tx) => {
            tx.executeSql(
                `
                    UPDATE Notas SET titulo = ?, categoria = ?;
                `,
                [
                    nota.titulo,
                    nota.categoria,
                    nota.texto,
                    nota.id
                ],
                () => {
                    resolve('Nota atualizada!')
                },
                (_, error) => reject(error)
            )
        })
    })
}

export async function removerNota(id){
    return new Promise((resolve, reject) => {
        tarefas.transaction((tx) => {
            tx.executeSql(
                `
                    DELETE FROM Notas WHERE ID = ?;
                `,
                [
                    id
                ],
                () => {
                    resolve('Nota removida!')
                },
                (_, error) => reject(error)
            )
        })
    })
}