{
  id: "Heading",
  title: "Heading",
  type: CustomCollectionFieldType.custom,
  required: true,
  onCustomRender: (field, value, onUpdate, item, itemId, onError) => {
    return React.createElement("div", null, 
      React.createElement("input", {
        type: "text",
        value: value || "",
        maxLength: 15, // Restrict input length
        onChange: (e) => {
          const inputValue = e.target.value;
          if (inputValue.length > 15) {
            onError("Heading should not exceed 15 characters.");
          } else {
            onError(""); // Clear error when valid
            onUpdate(field.id, inputValue);
          }
        },
        style: {
          width: "100%",
          padding: "5px",
          border: "1px solid #ccc",
          borderRadius: "4px",
        },
      }),
      value && value.length > 15
        ? React.createElement("span", { style: { color: "red", fontSize: "12px" } }, "Heading should not exceed 15 characters.")
        : null
    );
  },
}
