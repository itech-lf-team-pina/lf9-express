
window.addEventListener("DOMContentLoaded", (event) => {
    const inputs = {
        "ip" : document.querySelector("#ip"),
        "mac" :document.querySelector("#mac"),
        "hostname" : document.querySelector("#hostname"),
        "interfaceName" : document.querySelector("#interfaceNameInput")
    }

    const table = document.querySelector("#host-table")
    const filterSubmit = document.querySelector("#filter-submit")
    const filterReset = document.querySelector("#filter-reset")
    filterSubmit.addEventListener("click", ()  => filterTable())
    filterReset.addEventListener("click", ()  => resetFilter())

    function resetFilter() {

        for (let key in inputs) {
            inputs[key].value = "";
        }

        table.querySelectorAll("#host-table-body tr").forEach((el) => {
            el.classList.remove("--hidden")
        })
    }

    function filterTable() {
        const inputValues = {};
        for (let key in inputs) {
            inputValues[key] = inputs[key].value.toUpperCase().trim();
        }

        console.log(inputValues)
        table.querySelectorAll("#host-table-body tr").forEach((el) => {
            const ip = el.querySelector(".host-ip").innerHTML.toUpperCase().trim()
            const hostname = el.querySelector(".host-name").innerHTML.toUpperCase().trim()
            const mac = el.querySelector(".host-mac").innerHTML.toUpperCase().trim()
            const interfaceName = el.querySelector(".interfaceName").innerHTML.toUpperCase().trim()

            console.log("interfaceName", interfaceName)

            console.log(
                ip.includes(inputValues["ip"]),
                hostname.includes(inputValues["hostname"]),
                mac.includes(inputValues["mac"]),
                interfaceName.includes(inputValues["interfaceName"]),
                inputValues["ip"],
                inputValues["hostname"],
                inputValues["mac"],
                inputValues["interfaceName"]
            )

            if(
                ip.includes(inputValues["ip"]) &&
                hostname.includes(inputValues["hostname"]) &&
                mac.includes(inputValues["mac"]) &&
                interfaceName.includes(inputValues.interfaceName)
            ){
                el.classList.remove("--hidden")
            } else el.classList.add("--hidden")
        })
    }
});
