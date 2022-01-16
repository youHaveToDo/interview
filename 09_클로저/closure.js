const outer = () => {
  let a = 1;
  const inner = () => {
    return ++a;
  };
  return inner;
};

let outer2 = outer();
console.log(outer2());
console.log(outer2());
