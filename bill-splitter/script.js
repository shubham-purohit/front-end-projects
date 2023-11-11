var tip = 0
var bill = 0
var selected_tip_id = ''
var previous_tip_id = ''

const input_value = (event, id) => {
    console.log(event)
    var inputValue = event.target.value;
    if (!/^\d*\.?\d*$/.test(inputValue)) {
        // If not numeric, prevent the input
        event.target.value = inputValue.replace(/[^0-9.]/g, '');
        return;
    }
    if (id === "tip_custom") {
        add_tip(tip_custom.value, id)
    } else {
        calculate_amount()
    }
}

const input_count = (event) => {
    console.log(event)
    var inputValue = event.target.value;
    if (!/^\d*$/.test(inputValue)) {
        // If not an integer, prevent the input
        event.target.value = inputValue.replace(/[^\d]/g, '');
        return;
    }
    calculate_amount()
}

const add_tip = (tip_percent, id) => {
    tip = tip_percent
    selected_tip_id = id
    calculate_amount()
}

const calculate_amount = () => {
    selected_tip_id !== '' ? getElement(selected_tip_id).classList.add("tip-active") : tip = 0
    if (previous_tip_id !== '' && previous_tip_id !== selected_tip_id) {
        getElement(previous_tip_id).classList.remove("tip-active")
    }
    previous_tip_id = selected_tip_id
    const count = bill_count.value;
    const inputValue = bill_amount.value;
    const count_not_present = count === '' || parseInt(count) === 0
    const bill_not_present = inputValue === '' || inputValue === 0
    const tip_not_present = tip === '' || tip === 0
    const input_not_present = inputValue === '' || count_not_present
    tip_custom.value = tip;

    if (tip_not_present || count_not_present || bill_not_present) {
        tip_pp.innerText = "0.00"
    }
    else
        tip_pp.innerText = ((inputValue * tip / 100) / count).toFixed(2);

    if (count_not_present) {
        getElement("bill_count").classList.add("input-red");
        error_count.classList.add("error")
    } else {
        bill_count.classList.remove("input-red");
        error_count.classList.remove("error")
    }
    if (input_not_present) {
        total_pp.innerText = "0.00"
    } else {
        total_pp.innerText = (inputValue / count).toFixed(2)
    }
}

const reset_data = () => {
    bill_amount.value = ''
    bill_count.value = ''
    tip = ''
    tip_pp.innerText = '0.00'
    total_pp.innerText = '0.00'
    selected_tip_id !== '' && getElement(selected_tip_id).classList.remove("tip-active")
    bill_count.classList.remove("input-red")
    error_count.classList.remove("error")
    tip_custom.value = ''
    selected_tip_id = ''
}

const getElement = (id) => {
    return document.getElementById(id)
}