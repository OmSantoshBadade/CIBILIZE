// Legacy db.js - now imports from models/database.js
import {
  initializeDatabase,
  query,
  getClient,
  pool,
  uuidv4,
  UserModel,
  ExpenseModel,
  ExpenseFileModel,
  CreditCardModel,
  RecommendationModel,
} from "./models/database.js";

export {
  initializeDatabase,
  query,
  getClient,
  pool,
  uuidv4,
  UserModel,
  ExpenseModel,
  ExpenseFileModel,
  CreditCardModel,
  RecommendationModel,
};
