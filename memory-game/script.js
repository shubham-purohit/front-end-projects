let previousBlock = null;
let previousId = null;
let count = 0
let user_name = 'Anonymous'
let level = 1
let final_size = 0;
let lives = 3;
const colors = ['red', 'blue', 'yellow', 'brown', 'green', 'purple', 'pink', 'navy']

const flip = (id) => {
    if(previousId==id || lives===0) {
        return
    }
    const color = document.getElementById(id).classList[1]
    document.getElementById(id).classList.toggle('flipped')
    document.getElementById(id).classList.toggle('unflipped')
    if(previousBlock==null) {
        previousBlock = color
        previousId = id
        return
    }
    if(previousBlock==color) {
        reset()
        count++;
    } else {
        setTimeout(() => {
            unflip(id);
            --lives;
            document.getElementById('lives_count').innerText = lives;
            if(lives===0) {
                document.getElementById('result').innerHTML = " Lost!";
            }
        }, 500);
    }
    console.log(`${count} === ${final_size}`)
    if(count===final_size) {
        setTimeout(() => {
            document.getElementById('result').innerHTML = " Wins!";
        }, 500);
    }
    
}

const back_to_menu = () => {
    reset()
    document.getElementById('game').classList.add('remove')
    document.getElementById('form').classList.remove('remove')
    user_name = 'anonymous'
    level = 1
    count = 0
    document.getElementById('board').innerHTML = ''
}

const reset_game = () => {
    reset();
    count=0;
    const lst = document.getElementsByClassName('block');
    [...lst].forEach(element => {
        const id = element.id
        document.getElementById(id).classList.remove('flipped')    
        document.getElementById(id).classList.add('unflipped')    
    });
    lives = 3;
    document.getElementById('lives_count').innerHTML = lives;
    document.getElementById('result').innerText = '';
}

const shuffle = (size) => {
    for (var array=[],i=0;i<size;++i)
        array[i]=i;
    var tmp, current, top = array.length;
    if(top) while(--top) {
      current = Math.floor(Math.random() * (top + 1));
      tmp = array[current];
      array[current] = array[top];
      array[top] = tmp;
    }
    return array;
  }

const generate_game = (event) => {
    event.preventDefault();
    user_name = document.getElementById('name').value
    level = document.getElementById('difficulty').value
    const size = level==1 ? 3 : (level==2 ? 6 : 8);
    final_size = size;
    const arr = shuffle(size*2);
    console.log(final_size);
    updated_colors = [...colors].splice(0, size)
    document.getElementById('form').classList.add('remove')
    document.getElementById('game').classList.remove('remove')
    document.getElementById('user').innerHTML = user_name;
    lives = 3;
    document.getElementById('lives_count').innerHTML = lives;
    document.getElementById('board').classList.add(level==3 ? 'grid-4' : 'grid-3')
    for(let i=0; i<arr.length; i++) {
        const idx = arr[i];
        const div = document.createElement('div');
        div.classList.add('block')
        div.classList.add(idx>=size ? updated_colors[idx-size] : updated_colors[idx])
        div.classList.add('unflipped')
        div.id = idx;
        div.onclick = () => flip(idx);
        document.getElementById('board').appendChild(div);
    }
    start()
}

const reset = (id) => {
        previousBlock = null;
        previousId = null;
}

const unflip = (id) => {
        document.getElementById(id).classList.remove('flipped')
        document.getElementById(previousId).classList.remove('flipped')
        document.getElementById(id).classList.add('unflipped')
        document.getElementById(previousId).classList.add('unflipped')
        reset()
}

const start = () => {
    const lst = document.getElementsByClassName('block');
    [...lst].forEach(element => {
        const id = element.id
        document.getElementById(id).classList.remove('unflipped')   
        setTimeout(() => {
            document.getElementById(id).classList.add('unflipped')
        }, 500*final_size)
    });
}