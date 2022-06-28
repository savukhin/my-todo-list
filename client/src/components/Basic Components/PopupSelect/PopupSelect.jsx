import "./PopupSelect.css";
import $ from 'jquery';
import { useEffect, useRef } from 'react';
import Select from 'react-select';
import { useState } from "react";

var PopupSelect = ({ icons, titles, keys, setter, default_key }) => {
    if (icons.length !== titles.length || icons.length !== keys.length)
        throw new Error("icons, titles and keys must be the same lenght");

    const styles = {
        container: (provided, state) => ({
            ...provided,
            width: "300px",
            maxHeight: "100px",
        }),
        input: (provided, state) => ({
            ...provided,
            color: "var(--text-color)",
        }),
        control: (provided, state) => ({
            ...provided,
            backgroundColor: "var(--second-bg-color)",
            color: "var(--text-color)",
        }),
        indicatorSeparator: (provided, state) => ({
            ...provided,
            backgroundColor: "var(--text-color)",
        }),
        menu: (provided, state) => ({
            ...provided,
            backgroundColor: "var(--frame-color)",
            transform: "translateY(-7px)"
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: "var(--second-bg-color)",
            fontSize: state.selectProps.myFontSize
        }),
        singleValue: (provided, state) => ({
            ...provided,
            backgroundColor: "var(--second-bg-color)",
            color: "var(--text-color)",
        })
    };

    let options = titles.map((_, index) => {
        return {
            title: titles[index],
            icon: icons[index],
            key: keys[index]
        }
    })

    let generateOptionDiv = (title, icon, key=-1) => {
        return (
            <div className="project-tab" key={key}>
                <div className="project-name">
                    <div className="select-icon">
                        {icon}
                    </div>
                    <span className="select-title">{title}</span>
                </div>
            </div>
        )
    }

    let selectOptions = options.map(({ title, icon, key }, _) => {
        return {
            label:
                generateOptionDiv(title, icon, key),
            value: title,
            key: key
        }
    })

    function hideSelect() {
        popupDiv.current.style.display = "none";
    }

    function showSelect() {
        popupDiv.current.style.display = "";
    }

    function toggleSelect(event) {
        if (popupDiv.current.style.display === "none")
            showSelect()
        else
            hideSelect()
    }

    let selectRef = useRef(null);
    let buttonRef = useRef(null);
    let popupDiv = useRef(null);
    const [chosenOption, setChosenOption] = useState(options.filter(option => option.key === default_key)[0]);

    function selectOption(event) {
        if (event === null)
            return;

        let option = options.filter(
            elem => elem.key === event.key
        )[0];

        setChosenOption(option);
        setter(option.key);

        setTimeout(() => selectRef.current.clearValue(), 0);

        hideSelect();
    }

    return (
        <div>
            <div className="button" onClick={toggleSelect}>
                <div className="project-tab" ref={buttonRef}>
                    {
                        generateOptionDiv(
                            chosenOption.title,
                            chosenOption.icon
                        )
                    }
                </div>
            </div>

            <div className="latent-select" style={{ "display": "none" }} ref={popupDiv}>
                <Select
                    ref={selectRef}
                    myFontSize="20px"
                    styles={styles}
                    options={selectOptions}
                    onChange={selectOption}
                    menuPlacement="top"
                    menuIsOpen={true}
                    aria-errormessage="asdf"
                    components={{
                        DropdownIndicator: () => null,
                        IndicatorSeparator: () => null
                    }}

                />
            </div>
        </div>
    );
};

export default PopupSelect;