import { Router } from 'express'
import badgeService from './services/badgeService';
import wayService from './services/wayService'
import userService from './services/userService'
import pointsService from './services/pointsService'
import areaService from './services/areaService';
import segmentService from './services/segmentService';

const router = Router()

router.get('/', (req, res) => {
    res.send('Hello world!');
  })

router.get('/api/ways', (req, res) => wayService.getAllWays(req, res))


router.get('/api/ongoingBadge', (req, res) => badgeService.getOngoingBadge(req, res))
router.get('/api/completedBadges', (req, res) => badgeService.getCompletedBadges(req, res))
router.get('/api/badge/:type', (req, res) => badgeService.getBadge(req, res))
router.get('/api/rank/:id', (req, res) => badgeService.getRankById(req, res))

router.get('/api/points', (req, res) => pointsService.getAllPoints(req, res))
router.get('/api/point/:id/bounds', (req, res) => pointsService.getBoundPoints(req, res))

router.get('/api/areas', (req, res) => areaService.getAllAreas(req, res))
router.get('/api/area/:id/points', (req, res) => pointsService.getAllPointsInArea(req, res))

router.post('/api/segment/add', (req, res) => segmentService.addNewSegment(req, res))
router.post('/api/segments/search', (req, res) => segmentService.segmentSearch(req, res))
router.post('/api/segments/:id', (req, res) => segmentService.segmentEdit(req, res))
router.delete('/api/segments/:id', (req, res) => segmentService.segmentDelete(req, res))

router.get('/api/loginUser', (req, res) => userService.logUserIn(req, res))
router.get('/api/loginEmployee', (req, res) => userService.logEmployeeIn(req, res))
router.get('/api/getLoggedInData', (req, res) => userService.loggedInData(req, res))

export default router