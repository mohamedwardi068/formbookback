
const bookSchema= require("../../models/book")
exports.getBooks = async (req, res) => {
  try {
    const books = await bookSchema.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: "Error fetching books", error });
  }
};

exports.removeBooks = async (req, res) => {
  try {
    const obj = req.params
    const id = obj.id; 
    

 
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ message: 'Invalid ID format' });
    }
 
  const book = await bookSchema.findByIdAndDelete(id); 
    if (book) {
      res.status(200).json({ message: "Book deleted successfully" });
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting book", error });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const obj = req.params;
    const id = obj.id;
    const updatedData = req.body;

        console.log("Book ID:", id);

 
    for (const [key, value] of Object.entries(updatedData)) {
      console.log(`${key}: ${value}`);
    }

    
    const updatedBook = await bookSchema.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (updatedBook) {
      res.status(200).json({ message: "Book updated successfully", book: updatedBook });
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating book", error });
  }
};




exports.addBook = async (req, res) => {
  try {
    const { price, ageRestriction, description, bookName, bookLanguage, coverImg, categoryId, commandIds, rating } = req.body;
    if (!price || !bookName || !bookLanguage || !categoryId) {
      return res.status(400).json({ message: "Price, book name, language, and category ID are required" });
    }
    console.log("Received data:", { price, ageRestriction, description, bookName, bookLanguage, coverImg, categoryId, commandIds, rating });

    const newBook = new bookSchema({
      price,
      ageRestriction,
      description,
      bookName,
      bookLanguage,
      coverImg,
      categoryId,
      commandIds,
      rating,
      createdAt: Date.now()
    });

    const savedBook = await newBook.save();
    res.status(200).json({ message: "Book added successfully", book: savedBook });
  } catch (error) {
    console.error("Error adding book:", error); // Detailed error logging
    res.status(500).json({ message: "Error adding book", error: error.message }); // Send the error message to the client
  }
};

