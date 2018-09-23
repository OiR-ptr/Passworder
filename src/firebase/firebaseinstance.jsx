import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import {config} from './firebaseconfig';

export const firebaseApp = firebase.initializeApp(config);