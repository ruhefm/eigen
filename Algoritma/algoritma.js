function reverse(str) {
    const huruf = 'abcdefghijklmnopqrstuvwxyz';
    const reversed = huruf.split('').reverse().join('');
    return str.replace(/[a-z]/g, char => reversed[alphabet.indexOf(char)]);
  }
  
  console.log(reverse('NEGIE1'));
  
  function longest(sentence) {
    const input = sentence.split(' ');
    let longestDetect = '';
    input.forEach(input => {
      if (input.length > longestDetect.length) {
        longestDetect = input;
      }
    });
    return longestDetect;
  }
  
  console.log(longest("Saya sangat senang mengerjakan soal algoritma"));
  
  function hitungHuruf(input, query) {
    return query.map(word => input.filter(item => item === word).length);
  }
  
  console.log(hitungHuruf(['xc', 'dz', 'bbb', 'dz'], ['bbb', 'ac', 'dz']));
  
  function diagonal(matrix) {
    let diagonal1 = 0;
    let diagonal2 = 0;
    const n = matrix.length;
    
    for (let i = 0; i < n; i++) {
      diagonal1 += matrix[i][i];
      diagonal2 += matrix[i][n - i - 1];
    }
    
    return Math.abs(diagonal1 - diagonal2);
  }
  
  const matrix = [
    [1, 2, 0],
    [4, 5, 6],
    [7, 8, 9]
  ];
  
  console.log(diagonal(matrix));
  