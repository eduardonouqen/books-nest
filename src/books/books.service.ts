import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Model } from 'mongoose';
import { Book } from './schemas/book.schemas';

@Injectable()
export class BooksService {
  constructor(@InjectModel(Book.name) private readonly bookModel: Model<Book>) { }

  async create(createBookDto: CreateBookDto) {
    const createdBook = await this.bookModel.create(createBookDto);
    return createdBook;
  }

  async findAll() {
    return this.bookModel.find();
  }

  async findOne(id: number) {
    return this.bookModel.findOne({ _id: id });
  }

  async update(id: string, updateBookDto: UpdateBookDto) {
    const updatedBook = await this.bookModel.findByIdAndUpdate(id, updateBookDto, { new: true });
    return updatedBook;
  }

  async remove(id: string) {
    const deletedBook = await this.bookModel.findByIdAndDelete(id);
    return deletedBook;
  }
}
