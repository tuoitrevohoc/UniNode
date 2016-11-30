import * as mongoose from "mongoose";

/**
 * Create an accessor
 *
 * @param collectionName
 * @param schema
 * @return {mongoose.Model<T>}
 */
export function createAccessor<T extends mongoose.Document>(collectionName: string, schema: mongoose.Schema) {

  schema.set("toJSON", {
    transform: function (doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
    }
  });

  return mongoose.model<T>(collectionName, schema);
}

// connect to the database
mongoose.connect("mongodb://localhost/database");