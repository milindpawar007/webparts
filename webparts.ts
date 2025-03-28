private async uploadFileToSharePoint(attachment: IFilePickerResult): Promise<string> {
    if (!attachment || attachment.fileAbsoluteUrl !== null) {
      return attachment?.fileAbsoluteUrl || "";
    }

    const file = await attachment.downloadFileContent();

    // Get subsite name dynamically
    const siteRelativeUrl = this.context.pageContext.web.serverRelativeUrl;
    const subsiteName = siteRelativeUrl.split("/").pop()?.replace(/\s+/g, "_");
    const folderPath = `${this.context.pageContext.site.serverRelativeUrl}/SiteAssets/SitePages/${subsiteName}_Bc_Carousel_Image_Data`;

    // Upload the file to SharePoint
    const uploadedFile = await this.web
      .getFolderByServerRelativePath(folderPath)
      .files.addChunked(attachment.fileName, file, { Overwrite: true });

    return uploadedFile?.ServerRelativeUrl || "";
  }

private _onFilePickerSave = async (filePickerResult: IFilePickerResult) => {
    try {
      const fileContent = await filePickerResult.downloadFileContent();
      if (fileContent) {
        const folderUrl = `/sites/${this.context.pageContext.site.id}/SiteAssets/SitePages/Dashboard`;
        await this.context.spHttpClient.post(
          `${this.context.pageContext.web.absoluteUrl}/_api/web/getFolderByServerRelativeUrl('${folderUrl}')/files/add(overwrite=true, url='${filePickerResult.fileName}')`,
          { body: fileContent }
        );
        console.log("File uploaded successfully");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

{
  id: "ButtonLink",
  title: "Button Link",
  type: CustomCollectionFieldType.url,
  placeholder: "The URL must begin with https://",
  required: false,
  onGetErrorMessage: (value: any) => {
    if (!value) return "";

    // Ensure URL starts with "http"
    if (!value.startsWith("http")) {
      return "Error: The URL must start with 'http'. Example: https://www.example.com";
    }

    // Validate HTTPS URL format
    const urlPattern = /^(https:\/\/)[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(:\d+)?(\/[^\s]*)?$/;
    if (!urlPattern.test(value)) {
      return "Error: The URL must be valid and begin with 'https://'. Example: https://www.google.com";
    }

    return "";
  }
}

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
