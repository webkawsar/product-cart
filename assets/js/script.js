(function(){
    // select necessary all elements
    const formElm = document.querySelector('form');
    const nameInputElm = document.querySelector('.product-name');
    const priceInputElm = document.querySelector('.product-price');
    const listGroupElm = document.querySelector('.list-group');
    const filterElm = document.querySelector('#filter');


    // data layer
    let products = [];

    const receiveInputs = () => {
        const nameInput = nameInputElm.value;
        const priceInput = priceInputElm.value;
        return {nameInput, priceInput};
    }

    const validateInput = (name, price) => {
        let isError = false;
        if(!name || name.length < 3) {
            isError = true;
        }
        if(!price || Number(price) < 0) {
            isError = true;
        }

        return isError;
    }

    const addItemToUI = (id, name, price) => {

        const htmlListElm = `<li class="list-group-item item-${id} collection-item">
                                <strong>${name}</strong>- <span class="price">$${price}</span>
                                <i class="fa fa-trash delete-item float-right"></i>
                            </li>`;
        listGroupElm.insertAdjacentHTML('afterbegin', htmlListElm);
    }

    const resetInput = () => {
        nameInputElm.value = '';
        priceInputElm.value = '';
    }

    const getItemId = (elm) => {
        
        return Number(elm.parentElement.classList[1].split('-')[1]);
    }

    const removeItemFromUI = (id) => {
        document.querySelector(`.item-${id}`).remove();
    }

    const removeItemFromDataStore = (id) => {
        products = products.filter(item => item.id !== id);
    }

    const showAllItemToUI = (filteredArr) => {
        listGroupElm.innerHTML = '';
        filteredArr.forEach(item => {

            const htmlListElm = `<li class="list-group-item item-${item.id} collection-item">
                                    <strong>${item.name}</strong>- <span class="price">$${item.price}</span>
                                    <i class="fa fa-trash delete-item float-right"></i>
                                </li>`;
            listGroupElm.insertAdjacentHTML('afterbegin', htmlListElm);

        })


    }

    const init = () => {
            
        formElm.addEventListener('submit', (e) => {
            e.preventDefault();

            // receiving input
            const {nameInput, priceInput} = receiveInputs();

            // validate input
            const isError = validateInput(nameInput, priceInput);
            if(isError) {
                alert('Please provide valid input');
                return;
            }


            // generate id
            const id = products.length;
            // add item to data store
            products.push({
                id,
                name: nameInput,
                price: priceInput
            })
            addItemToUI(id, nameInput, priceInput);

            // reset the input
            resetInput();

        })

        listGroupElm.addEventListener('click', (e) => {
            if(e.target.classList.contains('delete-item')) {
        
                const id = getItemId(e.target);
        
                // delete item from UI
                removeItemFromUI(id);
        
                // delete item from data store
                removeItemFromDataStore(id);
            }
        })

        filterElm.addEventListener('keyup', (e) => {

            const filteredValue = e.target.value;
            const result = products.filter(product => product.name.includes(filteredValue));
        
            // show on DOM
            showAllItemToUI(result);
        })
        
    }

    init();

})();