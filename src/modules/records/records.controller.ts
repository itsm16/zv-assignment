import {Request, Response} from 'express'
import ApiResponse from '../../common/utils/api-response.js'
import * as recordService from './records.service.js'

const create = async (req: Request, res: Response) => {
    const createRecord = await recordService.createRecord(req.body)
    ApiResponse.ok(res, "record created successfully", createRecord)
}

const getAllRecords = async (req: Request, res: Response) => {
    const getAllRecords = await recordService.getAllRecords()
    ApiResponse.ok(res, "all records fetched successfully", getAllRecords)
}

const getById = async (req: Request, res: Response) => {
    const getRecordById = await recordService.getRecordById({id : req.params.id as string})
    ApiResponse.ok(res, "record fetched successfully", getRecordById)
}

const updateRecord = async (req: Request, res: Response) => {
    const updateRecord = await recordService.updateRecord({id: req.params.id as string, ...req.body})
    ApiResponse.ok(res, "record updated successfully", updateRecord)
}

const deleteRecord = async (req: Request, res: Response) => {
    const deleteRecord = await recordService.deleteRecord({id: req.params.id as string})
    ApiResponse.ok(res, "record deleted successfully", deleteRecord)
}


export {
    create,
    getAllRecords,
    getById,
    deleteRecord,
    updateRecord
}