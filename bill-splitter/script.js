var tip = 0
var bill = 0
var selected_tip_id = ''
var previous_tip_id = ''

const tip_id_map = {
    5 : "tip_5",
    10 : "tip_10",
    15 : "tip_15",
    25 : "tip_25",
    50 : "tip_50"
}

const toggle_outline = (id) => {
    getElement(id + "_label").classList.toggle("input-outline-focus")
}

const input_value = (event, id) => {
    var inputValue = event.target.value;
    if (!/^\d*\.?\d*$/.test(inputValue)) {
        // If not numeric, prevent the input
        event.target.value = inputValue.replace(/[^0-9.]/g, '');
        return;
    }
    if (id === "tip_custom") {
        const tip_curr_id = tip_id_map[parseFloat(tip_custom.value)]
        add_tip(tip_custom.value, tip_curr_id ?? id)
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
    selected_tip_id !== '' ? getElement(selected_tip_id).classList.add("tip-active") : tip = ''
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
        bill_count_label.classList.add("input-red");
        error_count.classList.add("error")
    } else {
        bill_count_label.classList.remove("input-red");
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
    bill_count_label.classList.remove("input-red")
    error_count.classList.remove("error")
    tip_custom.value = ''
    selected_tip_id = ''
}

const getElement = (id) => {
    return document.getElementById(id)
}