let target = {a: 1,e:[333,444]}
let source1 = {b: 2}
let source2 = {c: 3}
Object.assign(target, source1, source2)
console.log(target)