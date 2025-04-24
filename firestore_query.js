import { db } from './firebase_init.js';
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  setDoc,
  doc,
  query,
  where,
  orderBy
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

export class FirestoreService {
  constructor(collectionName) {
    this.collectionRef = collection(db, collectionName);
  }
 //////////////////////////////////
 // Muestra todos los documentos //
 //////////////////////////////////
 
  async getAllDocuments() {
    const snapshot = await getDocs(this.collectionRef);
    const data = [];
    snapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });
    return data;
  }

 ////////////////////////////////
 //  Add SeedPerformanceData   //
 ////////////////////////////////

  async seedPerformanceData(n = 5) {
    const comments = ['Excellent', 'Good', 'Needs improvement'];
    for (let i = 0; i < n; i++) {
      const record = {
        score: parseFloat((Math.random() * 4 + 1).toFixed(2)),
        timestamp: new Date(),
        comment: comments[Math.floor(Math.random() * comments.length)]
      };
      await addDoc(this.collectionRef, record);
    }
  }
  
 ////////////////////////////////
 // Encuentra las notas altas  //
 ////////////////////////////////

  async queryHighScores(minScore = 4.0) {
    const q = query(
      this.collectionRef,
      where("score", ">", minScore),
      orderBy("score", "desc"),
      orderBy("timestamp", "desc")
    );

    const snapshot = await getDocs(q);
    const results = [];

    snapshot.forEach(doc => {
      results.push({ id: doc.id, ...doc.data() });
    });

    return results;
  }

 //////////////////////////////////
 //     ComputeAverageScore      //
 //////////////////////////////////

  async computeAverageScore() {
    const snapshot = await getDocs(this.collectionRef);
    const scores = [];

    snapshot.forEach(doc => {
      const data = doc.data();
      if (data.score !== undefined) {
        scores.push(data.score);
      }
    });

    if (!scores.length) return null;

    return (scores.reduce((acc, val) => acc + val, 0) / scores.length).toFixed(2);
  }
}
