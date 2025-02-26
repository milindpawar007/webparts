{
  id: "Heading",
  title: "Heading",
  type: CustomCollectionFieldType.custom,
  required: true,
  onCustomRender: (field, value, onUpdate, item, itemId) => {
    const [error, setError] = React.useState<string>("");

    return React.createElement("div", null, 
      React.createElement("input", {
        type: "text",
        value: value || "",
        maxLength: 15, // Restrict input length
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
          const inputValue = e.target.value;
          if (inputValue.length > 15) {
            setError("Heading should not exceed 15 characters.");
          } else {
            setError(""); // Clear error when valid
          }
          onUpdate(field.id, inputValue); // Update field value
        },
        style: {
          width: "100%",
          padding: "5px",
          border: "1px solid #ccc",
          borderRadius: "4px",
        },
      }),
      error
        ? React.createElement("span", { style: { color: "red", fontSize: "12px" } }, error)
        : null
    );
  },
}
