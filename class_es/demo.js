class Point {
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    static create(x, y){
        return new Point(x, y)
    }

    add(){
        console.log(this.x + this.y)
    }
}

class ColorPoint extends Point {
    constructor(x, y, color) {
        super(x, y)
        this.color = color
    }

    set color (color){
        this.color = color
    }

    get color(){
        return this.color
    }

    //print(){
    //    console.log(this.x + ';' + this.y + ';' + this.color)
    //}
}

let p1 = new Point(20, 30)
let p2 = Point.create(40, 5)
p2.add()

let cp = new ColorPoint(20, 30, 'red')
console.log(cp)
cp.color = "green"
console.log(cp)