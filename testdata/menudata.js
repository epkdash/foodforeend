const getMenus = function (mId) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            if (typeof(mId) === 'undefined' || mId === '') {
                resolve(getMenudatas());
            } else {
                resolve(getMenudatas().filter((data) => data.id.toString() === mId.toString())[0]);
            }

        }, 100);
    });
}

const getRandomMenus = function () {
    return new Promise(function (resolve) {
        setTimeout(() => {
            resolve(getMenudatas().splice(0, 7));
        }, 100);
    });
}

const getOneMenu = function (mId) {
    return getMenus(mId)
}

const getMenudatas = function () {
    return [
        {
            id: 1000,
            title: 'xxx',
            tags: ['好吃', '好看', '少油', '少糖'],
            imtro: '食谱简介asdfas',
            ingredients: '原料xxasfasfd',
            burden: '食谱佐料asfdasdfas',
            albums: '/gruel.jpg',
            steps: [
                {step: '步骤一：二两米', img: ''},
                {step: '步骤二：一升水', img: ''},
                {step: '步骤三：煮', img: ''},
                {step: '步骤四：吃', img: ''}
            ]
        },
        {
            id: 1001,
            title: '热腾腾的白米饭',
            tags: ['好吃', '好看', '少油', '少糖'],
            imtro: '人人都爱',
            ingredients: '原料只有大米',
            burden: '佐料含有适量的水',
            albums: '/gruel.jpg',
            steps: [
                {step: '步骤一：二两米', img: ''},
                {step: '步骤二：一升水', img: ''},
                {step: '步骤三：煮', img: ''},
                {step: '步骤四：吃', img: ''}
            ]
        },
        {
            id: 1002,
            title: 'yyy',
            tags: ['好吃', '好看', '少油', '少糖'],
            imtro: '食谱简介afafsdfas',
            ingredients: '原料xxasfeeewaasfd',
            burden: '食谱佐料asfdasfawdfas',
            albums: '/gruel.jpg',
            steps: [
                {step: '步骤一：二两米', img: ''},
                {step: '步骤二：一升水', img: ''},
                {step: '步骤三：煮', img: ''},
                {step: '步骤四：吃', img: ''}
            ]
        },
        {
            id: 1003,
            title: 'yyy',
            tags: ['好吃', '好看', '少油', '少糖'],
            imtro: '食谱简介afafsdfas',
            ingredients: '原料xxasfeeewaasfd',
            burden: '食谱佐料asfdasfawdfas',
            albums: '/gruel.jpg',
            steps: [
                {step: '步骤一：二两米', img: ''},
                {step: '步骤二：一升水', img: ''},
                {step: '步骤三：煮', img: ''},
                {step: '步骤四：吃', img: ''}
            ]
        },
        {
            id: 1004,
            title: 'yyy',
            tags: ['好吃', '好看', '少油', '少糖'],
            imtro: '食谱简介afafsdfas',
            ingredients: '原料xxasfeeewaasfd',
            burden: '食谱佐料asfdasfawdfas',
            albums: '/gruel.jpg',
            steps: [
                {step: '步骤一：二两米', img: ''},
                {step: '步骤二：一升水', img: ''},
                {step: '步骤三：煮', img: ''},
                {step: '步骤四：吃', img: ''}
            ]
        },
        {
            id: 1005,
            title: 'yyy',
            tags: ['好吃', '好看', '少油', '少糖'],
            imtro: '食谱简介afafsdfas',
            ingredients: '原料xxasfeeewaasfd',
            burden: '食谱佐料asfdasfawdfas',
            albums: '/gruel.jpg',
            steps: [
                {step: '步骤一：二两米', img: ''},
                {step: '步骤二：一升水', img: ''},
                {step: '步骤三：煮', img: ''},
                {step: '步骤四：吃', img: ''}
            ]
        },
        {
            id: 1006,
            title: 'yyy',
            tags: ['好吃', '好看', '少油', '少糖'],
            imtro: '食谱简介afafsdfas',
            ingredients: '原料xxasfeeewaasfd',
            burden: '食谱佐料asfdasfawdfas',
            albums: '/gruel.jpg',
            steps: [
                {step: '步骤一：二两米', img: ''},
                {step: '步骤二：一升水', img: ''},
                {step: '步骤三：煮', img: ''},
                {step: '步骤四：吃', img: ''}
            ]
        },
        {
            id: 1007,
            title: 'yyy',
            tags: ['好吃', '好看', '少油', '少糖'],
            imtro: '食谱简介afafsdfas',
            ingredients: '原料xxasfeeewaasfd',
            burden: '食谱佐料asfdasfawdfas',
            albums: '/gruel.jpg',
            steps: [
                {step: '步骤一：二两米', img: ''},
                {step: '步骤二：一升水', img: ''},
                {step: '步骤三：煮', img: ''},
                {step: '步骤四：吃', img: ''}
            ]
        },
        {
            id: 1008,
            title: 'yyy',
            tags: ['好吃', '好看', '少油', '少糖'],
            imtro: '食谱简介afafsdfas',
            ingredients: '原料xxasfeeewaasfd',
            burden: '食谱佐料asfdasfawdfas',
            albums: '/gruel.jpg',
            steps: [
                {step: '步骤一：二两米', img: ''},
                {step: '步骤二：一升水', img: ''},
                {step: '步骤三：煮', img: ''},
                {step: '步骤四：吃', img: ''}
            ]
        }
    ]
}

module.exports = {
    getMenus,
    getRandomMenus,
    getOneMenu
};