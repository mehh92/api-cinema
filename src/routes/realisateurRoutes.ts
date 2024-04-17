import { Router, Request, Response } from "express";
import IDirector, { directorModel } from "../models/Realisateur";


const router = Router();


router.get('/', async (req: Request, res: Response) => {
  try {
    const directors = await directorModel.find();
    res.status(200).json(directors);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const director = await directorModel.findById(req.params.id);
    if (!director) return res.status(404).send('Realisateur non trouvé');
    res.json(director);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const director: IDirector = req.body;
    const nouveauDirector = new directorModel(director);
    await nouveauDirector.save();
    res.status(201).json(nouveauDirector);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const director = await directorModel.findById(req.params.id);
    if (!director) return res.status(404).send('Realisateur non trouvé');
    await directorModel.findByIdAndDelete(req.params.id);
    res.send('Realisateur supprimé');
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  try {
    const director = await directorModel.findById(req.params.id);
    if (!director) return res.status(404).send('Realisateur non trouvé');
    await directorModel.findByIdAndUpdate(req.params.id, req.body);
    res.send('Realisateur mis à jour');
  }
  catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export default router