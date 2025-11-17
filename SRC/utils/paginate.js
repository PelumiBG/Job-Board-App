export const paginate = async (model,query={},options={}) => {
    let page = parseInt(options.page) || 1;
    let limit = parseInt(options.limit) || 3;
    let sort = options.srt || "-createdAt";

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
        model.find(query).sort(sort).skip(skip).limit(limit),
        model.countDocuments(query)
    ]);

    return {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        data
    };
}