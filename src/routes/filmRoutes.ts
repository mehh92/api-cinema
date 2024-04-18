import { Router, Request, Response } from "express";
import IFilm, { filmModel } from "../models/Film";


const router = Router();


router.get('/', async (req: Request, res: Response) => {
  try {
    const films = await filmModel.find();
    res.status(200).json(films);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const film = await filmModel.findById(req.params.id);
    if (!film) return res.status(404).send('Film non trouvé');
    res.json(film);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const film: IFilm = req.body;
    const nouveauFilm = new filmModel(film);
    await nouveauFilm.save();
    res.status(201).json(nouveauFilm);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});
  

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const film = await filmModel.findById(req.params.id);
    if (!film) return res.status(404).send('Film non trouvé');
    await filmModel.findByIdAndDelete(req.params.id);
    res.send('Film supprimé');
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  try {
    const film = await filmModel.findById(req.params.id);
    if (!film) return res.status(404).send('Film non trouvé');
    await filmModel.findByIdAndUpdate(req.params.id, req.body);
    res.send('Film mis à jour');
  }
  catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export default router