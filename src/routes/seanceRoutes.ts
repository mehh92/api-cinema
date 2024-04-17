import { Router, Request, Response } from "express";
import ISession, { sessionModel } from "../models/Seance";


const router = Router();


router.get('/', async (req: Request, res: Response) => {
  try {
    const seances = await sessionModel.find();
    res.status(200).json(seances);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const seance = await sessionModel.findById(req.params.id);
    if (!seance) return res.status(404).send('Seance non trouvée');
    res.json(seance);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const seance: ISession = req.body;
    const nouvelleSeance = new sessionModel(seance);
    await nouvelleSeance.save();
    res.status(201).json(nouvelleSeance);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const seance = await sessionModel.findById(req.params.id);
    if (!seance) return res.status(404).send('Seance non trouvée');
    await sessionModel.findByIdAndDelete(req.params.id);
    res.send('Seance supprimée');
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  try {
    const seance = await sessionModel.findById(req.params.id);
    if (!seance) return res.status(404).send('Seance non trouvée');
    await sessionModel.findByIdAndUpdate(req.params.id, req.body);
    res.send('Seance mise à jour');
  }
  catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export default router