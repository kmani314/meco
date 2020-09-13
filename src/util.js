import Qty from 'js-quantities';

// sum n vectors with units
function sumVecs(vecs) {
  // don't worry about it
  /* eslint-disable-next-line */
  const sum = Array(vecs[0].length).fill(Qty(0, vecs[0][0].toBase().units()));

  for (let i = 0; i < vecs[0].length; i += 1) {
    for (let j = 0; j < vecs.length; j += 1) {
      sum[i] = sum[i].add(vecs[j][i]);
    }
  }

  return sum;
}

// distance between two vectors
function distanceScalar(a, b) {
  let sum = Qty(0, 'm^2');

  for (let i = 0; i < a.length; i += 1) {
    // qty doesn't have exponentiation
    sum = sum.add(Qty(a[i].sub(b[i]).to('m').scalar ** 2, 'm^2'));
  }

  return Qty(sum.to('m^2').scalar ** 0.5, 'm');
}

function unitVector(a) {
  /* eslint-disable-next-line */
  const mag = distanceScalar(a, new Array(a.length).fill(Qty(0, a[0].toBase().units())));
  return a.map((c) => c.div(mag));
}

export default { sumVecs, distanceScalar, unitVector };
