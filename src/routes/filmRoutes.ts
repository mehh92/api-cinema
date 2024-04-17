import { Router, Request, Response } from "express";
import { auteursModel } from "../models/Auteur";
import Auteur from "../models/Auteur";


const router = Router();


router.get('/', async (req: Request, res: Response) => {
  try {
    const auteurs = await auteursModel.find();
    res.status(200).json(auteurs);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const auteur = await auteursModel.findById(req.params.id);
    if (!auteur) return res.status(404).send('Auteur non trouvé');
    res.json(auteur);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const auteur: Auteur = req.body;
    const nouveauAuteur = new auteursModel(auteur);
    await nouveauAuteur.save();
    res.status(201).json(nouveauAuteur);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const auteur = await auteursModel.findById(req.params.id);
    if (!auteur) return res.status(404).send('Auteur non trouvé');
    await auteursModel.findByIdAndDelete(req.params.id);
    res.send('Auteur supprimé');
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  try {
    const auteur = await auteursModel.findById(req.params.id);
    if (!auteur) return res.status(404).send('Auteur non trouvé');
    await auteursModel.findByIdAndUpdate(req.params.id, req.body);
    res.send('Auteur mis à jour');
  }
  catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export default router