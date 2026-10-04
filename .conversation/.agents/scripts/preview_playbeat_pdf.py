import fitz, os
path = "attached_assets/Premium_Digital_Marketplace_&_Smart_Projectors___PlayBeat_Digi_1791122575475.pdf"
out_dir = ".agents/outputs/playbeat_pdf_preview"
os.makedirs(out_dir, exist_ok=True)
doc = fitz.open(path)
print("pages:", doc.page_count)
print("metadata:", doc.metadata)
for i in range(min(doc.page_count, 3)):
    page = doc[i]
    print(f"PAGE {i+1} size={page.rect} images={len(page.get_images(full=True))}")
    print(page.get_text()[:1500].replace("\n", " | "))
    pix = page.get_pixmap(matrix=fitz.Matrix(0.6, 0.6), alpha=False)
    pix.save(f"{out_dir}/page-{i+1}.png")
