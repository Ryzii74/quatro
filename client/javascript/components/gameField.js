var gameField = new Vue({
    el: '#gameField',
    data: {
        field: [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        moves: [
            [1, 2, 3, 4],
            [5, 6, 7, 8],
            [9, 10, 11, 12],
            [13, 14, 15, 16]
        ],
        yourTurn: true,
        selectedMove: null
    },
    methods: {
        selectMove: function (rowIndex, itemIndex) {
            if (!this.yourTurn) return;

            
            this.selectedMove = {};
            this.selectedMove.x = rowIndex;
            this.selectedMove.y = itemIndex;

        },
        makeMove: function (rowIndex, itemIndex) {
            if (!this.selectedMove) return;
            this.field[rowIndex][itemIndex] = this.moves[this.selectedMove.x][this.selectedMove.y];
            this.selectedMove = null;

            this.checkIsWin();
        },
        checkIsWin: function () {
            console.log('no win')
        }
    }
});
