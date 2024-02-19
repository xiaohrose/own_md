/**
 * 图结构
 */

class Graph {
    constructor() {
        this.AdjList = new Map();
    }


    addVertex(vertex) {

        if (!this.AdjList.has(vertex)) {
            this.AdjList.set(vertex, [])
        }

        throw 'exist vertex!'
    }
}