
import { string } from "zod";
import ApiError from "../../common/utils/api-error.js";
import prisma from "../../config/prisma.js";
import { createRecordInput, updateRecordDto, updateRecordParams } from "./dto/records.dto.js";

const createRecord = async({amount, note, type, userId} : createRecordInput) => {
    const record = await prisma.financialRecords.create({
        data: {
            amount,
            note : note as string,
            userId: userId as string,
        }
    })

    if(!record) {
        throw ApiError.internal("Failed to create record")
    }

    return record
}

const getAllRecords = async() => {
    const records = await prisma.financialRecords.findMany()

    if(!records) {
        throw ApiError.notFound("Records not found")
    }

    return records
}

const getRecordById = async({id}: {id: string}) => {
    const record = await prisma.financialRecords.findUnique({
        where: {
            id
        }
    })
    
    if(!record) {
        throw ApiError.notFound("Record not found")
    }

    return record
}

const updateRecord = async({id, amount, note, type}: updateRecordParams) => {
    const record = await prisma.financialRecords.findUnique({
        where: {
            id
        }
    })

    if(!record) {
        throw ApiError.notFound("Record not found")
    }


    const updatedRecord = await prisma.financialRecords.update({
        where: {
            id
        },
        data: {
            amount,
            note: note as string,
            type,
        }
    })

    if(!updatedRecord) {
        throw ApiError.notFound("Record not found")
    }

    return updatedRecord
}

const deleteRecord = async({id}: {id: string}) => {
    const record = await prisma.financialRecords.findUnique({
        where: {
            id
        }
    })

    if(!record) {
        throw ApiError.notFound("Record not found")
    }

    const deletedRecord = await prisma.financialRecords.delete({
        where: {
            id
        }
    })
    
    if(!deletedRecord) {
        throw ApiError.notFound("Record not found")
    }

    return deletedRecord
}

export {
    createRecord,
    getAllRecords,
    getRecordById,
    updateRecord,
    deleteRecord
}